import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Connexion administrateur",
  robots: { index: false },
};

export default function CrmLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-12">
      <LoginForm
        role="admin"
        title="Espace administrateur"
        subtitle="Connectez-vous pour accéder au CRM RenovAllo"
      />
      <p className="mt-6 text-sm text-slate-500">
        Vous êtes artisan partenaire ?{" "}
        <Link href="/artisan/login" className="font-medium text-emerald-700">
          Accéder à l&apos;espace artisan
        </Link>
      </p>
    </div>
  );
}
