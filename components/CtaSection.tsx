import Link from "next/link";

export function CtaSection({
  title = "Prêt à démarrer votre projet ?",
  subtitle = "Chiffrage gratuit · Réponse sous 72h · Sans engagement",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="section-pad bg-emerald-800">
      <div className="container-site flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>
        <p className="text-lg text-emerald-100">{subtitle}</p>
        <Link href="/demande-devis" className="btn-accent">
          Chiffrer mes travaux gratuitement
        </Link>
      </div>
    </section>
  );
}
