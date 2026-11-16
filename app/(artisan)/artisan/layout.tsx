import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/server";
import { ArtisanShell } from "@/components/artisan/ArtisanShell";

export const instant = false;

export default async function ArtisanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/artisan/login");
  }
  if (profile.role !== "artisan") {
    redirect("/crm/admin");
  }

  return <ArtisanShell>{children}</ArtisanShell>;
}
