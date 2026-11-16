import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/supabase/server";
import { AdminShell } from "@/components/admin/AdminShell";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/crm/login");
  }
  if (profile.role !== "admin") {
    redirect("/artisan");
  }

  return <AdminShell>{children}</AdminShell>;
}
