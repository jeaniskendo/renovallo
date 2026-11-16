import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
        Erreur 404
      </p>
      <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
        Page introuvable
      </h1>
      <p className="mt-3 max-w-md text-slate-600">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
        <Link href="/demande-devis" className="btn-outline">
          Demander un devis
        </Link>
      </div>
    </div>
  );
}
