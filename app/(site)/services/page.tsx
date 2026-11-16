import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CtaSection } from "@/components/CtaSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Tous les métiers de la rénovation | Courtier en travaux en Bourgogne-Franche-Comté",
  description:
    "Rénovation globale, énergétique, isolation, fenêtres, panneaux solaires, salle de bain, toiture, plomberie : découvrez les 19 corps de métier pris en charge par RenovAllo en Bourgogne-Franche-Comté.",
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Nos métiers" }]} />
      <section className="section-pad pt-4">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold text-slate-900">
              Tous les métiers de la rénovation
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Courtier en travaux tous corps de métier en Bourgogne-Franche-Comté :
              un accompagnement unique pour chiffrer, sélectionner les artisans et
              piloter votre chantier de A à Z.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card group flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <ServiceIcon name={s.iconKey} className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-emerald-700">
                  {s.name}
                </h2>
                <p className="mt-2 flex-1 text-sm text-slate-600">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                  Voir la prestation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
