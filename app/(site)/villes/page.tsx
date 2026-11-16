import Link from "next/link";
import type { Metadata } from "next";
import { CITIES } from "@/lib/data/cities";
import { DEPARTMENTS } from "@/lib/data/departments";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Zones d'intervention | Courtier en travaux en Bourgogne-Franche-Comté",
  description:
    "RenovAllo intervient dans toutes les villes de Bourgogne-Franche-Comté : Dijon, Besançon, Chalon-sur-Saône, Mâcon, Auxerre, Nevers, Belfort et bien plus.",
  alternates: { canonical: `${SITE_URL}/villes` },
};

export default function VillesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Nos secteurs" }]} />
      <section className="section-pad pt-4">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold text-slate-900">
              Nos secteurs d&apos;intervention
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Un courtier en travaux local, présent dans les 8 départements et
              toutes les communes de la Bourgogne-Franche-Comté.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {DEPARTMENTS.map((dep) => {
              const cities = CITIES.filter(
                (c) => c.departmentCode === dep.code
              );
              return (
                <div key={dep.code}>
                  <h2 className="text-lg font-bold text-emerald-700">
                    {dep.name} ({dep.code})
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/villes/${city.slug}`}
                          className="text-slate-700 transition-colors hover:text-emerald-700"
                        >
                          {city.name}
                          <span className="ml-1 text-xs text-slate-400">
                            {city.postalCode}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
