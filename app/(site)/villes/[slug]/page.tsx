import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { getCity, CITIES } from "@/lib/data/cities";
import { SERVICES } from "@/lib/data/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { LeadForm } from "@/components/LeadForm";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `Courtier en travaux à ${city.name} (${city.postalCode}) | RenovAllo`,
    description: `Rénovation, isolation, extension à ${city.name} et alentours. Chiffrage gratuit sous 72h, artisans qualifiés en ${city.department}. Votre courtier en travaux à ${city.name}.`,
    alternates: { canonical: `${SITE_URL}/villes/${city.slug}` },
    openGraph: {
      title: `Courtier en travaux à ${city.name} | RenovAllo`,
      description: `Votre courtier en travaux à ${city.name} (${city.postalCode}) : rénovation, isolation, extension. Chiffrage gratuit sous 72h.`,
    },
  };
}

export default async function VillePage({ params }: Props) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const nearby = CITIES.filter(
    (c) =>
      c.departmentCode === city.departmentCode && c.slug !== city.slug
  ).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `RenovAllo — Courtier en travaux à ${city.name}`,
    url: `${SITE_URL}/villes/${city.slug}`,
    description: `Courtier en travaux et maître d'œuvre à ${city.name} (${city.postalCode}). Rénovation, isolation, extension, tous corps de métier.`,
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      postalCode: city.postalCode,
      addressRegion: city.department,
      addressCountry: "FR",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Nos secteurs", href: "/villes" },
          { label: city.name },
        ]}
      />

      <section className="bg-slate-50">
        <div className="container-site grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {city.department} ({city.departmentCode})
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Courtier en travaux à {city.name}
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Vous cherchez un courtier en travaux fiable à {city.name} (
              {city.postalCode}) ? RenovAllo vous accompagne dans tous vos
              projets de rénovation : chiffrage gratuit sous 72h, artisans
              qualifiés et suivi de chantier de A à Z.
            </p>
            <p className="mt-3 text-slate-600">
              Rénovation globale, rénovation énergétique, extension, salle de
              bain, toiture : nous couvrons tous les corps de métier à{" "}
              {city.name} et dans tout le {city.department}.
            </p>
          </div>
          <LeadForm defaultCity={city.name} />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <h2 className="text-2xl font-bold text-slate-900">
            Nos prestations à {city.name}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 8).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card group flex flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <ServiceIcon name={s.iconKey} className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-bold text-slate-900 group-hover:text-emerald-700">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{s.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        items={[
          {
            q: `Comment obtenir un devis de travaux à ${city.name} ?`,
            a: `Remplissez notre formulaire en ligne : notre équipe vous recontacte sous 72h avec un chiffrage gratuit et sans engagement pour votre projet à ${city.name}.`,
          },
          {
            q: `Intervenez-vous dans toute la région autour de ${city.name} ?`,
            a: `Oui, nous intervenons à ${city.name} et dans toutes les communes du ${city.department} et de la Bourgogne-Franche-Comté.`,
          },
          {
            q: "Quels artisans réaliseront les travaux ?",
            a: "Nous sélectionnons des artisans qualifiés, assurés et vérifiés, spécialisés dans chaque corps de métier, et vous mettons en relation avec le bon artisan.",
          },
        ]}
      />

      {nearby.length > 0 && (
        <section className="section-pad bg-slate-50 pt-0">
          <div className="container-site">
            <h2 className="text-xl font-bold text-slate-900">
              Nous intervenons aussi près de {city.name}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/villes/${c.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection title={`Un projet de rénovation à ${city.name} ?`} />
    </>
  );
}
