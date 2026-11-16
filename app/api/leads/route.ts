import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerClientForServer } from "@/lib/supabase/server";
import { CITIES } from "@/lib/data/cities";
import { slugify } from "@/lib/utils";

const MAX_PHOTOS = 8;
const MAX_PHOTO_SIZE = 8 * 1024 * 1024; // 8 Mo par photo

const schema = z.object({
  firstName: z.string().min(1, "Prénom requis"),
  lastName: z.string().min(1, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional().nullable(),
  projectType: z.string().min(1, "Type de travaux requis"),
  propertyType: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

function parseBudget(label?: string | null): { min: number | null; max: number | null } {
  if (!label) return { min: null, max: null };
  const nums = label.match(/\d[\d\s]*/g)?.map((n) => parseInt(n.replace(/\s/g, ""), 10)) ?? [];
  if (label.toLowerCase().includes("moins de")) return { min: null, max: nums[0] ?? null };
  if (label.toLowerCase().includes("plus de")) return { min: nums[0] ?? null, max: null };
  if (nums.length >= 2) return { min: nums[0], max: nums[1] };
  return { min: null, max: null };
}

function findCity(city?: string | null, postalCode?: string | null) {
  const citySlug = city ? slugify(city) : "";
  const found = CITIES.find(
    (c) =>
      (citySlug && c.slug === citySlug) ||
      (postalCode && c.postalCode === postalCode.trim())
  );
  return found ?? null;
}

function toText(v: FormDataEntryValue | null): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s || null;
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const raw = {
    firstName: toText(formData.get("firstName")) ?? "",
    lastName: toText(formData.get("lastName")) ?? "",
    email: toText(formData.get("email")) ?? "",
    phone: toText(formData.get("phone")),
    projectType: toText(formData.get("projectType")) ?? "",
    propertyType: toText(formData.get("propertyType")),
    budget: toText(formData.get("budget")),
    postalCode: toText(formData.get("postalCode")),
    city: toText(formData.get("city")),
    description: toText(formData.get("description")),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const budget = parseBudget(data.budget);
  const geo = findCity(data.city, data.postalCode);

  const files = (formData.getAll("photos") as File[])
    .filter((f) => f instanceof File && f.size > 0)
    .slice(0, MAX_PHOTOS);

  const supabase = await createServerClientForServer();

  // Upload des photos vers le bucket "leads"
  const photoUrls: string[] = [];
  for (const file of files) {
    if (file.size > MAX_PHOTO_SIZE) continue;
    const safeName =
      file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80) || "photo.jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${safeName}`;
    const { error: upErr } = await supabase.storage
      .from("leads")
      .upload(path, file, { contentType: file.type || "image/jpeg" });
    if (!upErr) {
      const { data: pub } = supabase.storage.from("leads").getPublicUrl(path);
      if (pub?.publicUrl) photoUrls.push(pub.publicUrl);
    }
  }

  const { data: leadId, error } = await supabase.rpc("create_lead", {
    p_first_name: data.firstName,
    p_last_name: data.lastName,
    p_email: data.email,
    p_phone: data.phone || null,
    p_project_type: data.projectType,
    p_property_type: data.propertyType || null,
    p_description: data.description || null,
    p_budget_min: budget.min,
    p_budget_max: budget.max,
    p_postal_code: data.postalCode || geo?.postalCode || null,
    p_city: data.city || geo?.name || null,
    p_department: geo?.department || null,
    p_lat: geo?.lat ?? null,
    p_lng: geo?.lng ?? null,
    p_page_url: null,
    p_photos: photoUrls,
  });

  if (error) {
    return NextResponse.json(
      { error: "Impossible d'enregistrer votre demande. Veuillez réessayer." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: leadId }, { status: 201 });
}
