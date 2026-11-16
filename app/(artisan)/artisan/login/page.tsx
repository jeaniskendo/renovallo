import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Connexion artisan",
  robots: { index: false },
};

export default function ArtisanLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12">
      <LoginForm
        role="artisan"
        title="Espace artisan partenaire"
        subtitle="Gérez vos leads, chantiers et devis"
      />
      <p className="mt-6 text-sm text-slate-500">
        Vous êtes administrateur ?{" "}
        <Link href="/crm/login" className="font-medium text-emerald-700">
          Accéder au CRM
        </Link>
      </p>
    </div>
  );
}
