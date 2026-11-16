import Link from "next/link";
import type { Metadata } from "next";
import { REALISATIONS } from "@/lib/data/testimonials";
import { SERVICES } from "@/lib/data/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Réalisations & chantiers | Courtier en travaux Bourgogne-Franche-Comté",
  description:
    "Découvrez nos chantiers réalisés en Bourgogne-Franche-Comté : rénovation complète, extension, salle de bain, rénovation énergétique. Des projets livrés avec succès.",
  alternates: { canonical: `${SITE_URL}/realisations` },
};

export default function RealisationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Réalisations" }]} />
      <section className="section-pad pt-4">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold text-slate-900">
              Nos réalisations
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Des projets livrés dans les délais et le budget, partout en
              Bourgogne-Franche-Comté.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REALISATIONS.map((r) => {
              const service = SERVICES.find((s) => s.slug === r.serviceSlug);
              return (
                <Link
                  key={r.slug}
                  href={`/services/${r.serviceSlug}`}
                  className="card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-44 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <ServiceIcon
                      name={service?.iconKey ?? "home"}
                      className="h-12 w-12 text-slate-400"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="font-bold text-slate-900">{r.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {r.city} · {r.surface}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {r.description}
                    </p>
                    <p className="mt-3 text-lg font-bold text-emerald-700">
                      {r.amount}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
