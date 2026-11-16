import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getService, SERVICES } from "@/lib/data/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { LeadForm } from "@/components/LeadForm";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: "RenovAllo",
      areaServed: "Bourgogne-Franche-Comté",
    },
    areaServed: "Bourgogne-Franche-Comté",
    url: `${SITE_URL}/services/${service.slug}`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[{ label: "Nos métiers", href: "/services" }, { label: service.name }]}
      />

      {/* HERO */}
      <section className="bg-slate-50">
        <div className="container-site grid grid-cols-1 items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <ServiceIcon name={service.iconKey} className="h-7 w-7" />
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {service.h1}
            </h1>
            {service.intro.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "mt-4 text-lg text-slate-700" : "mt-3 text-slate-600"}
              >
                {p}
              </p>
            ))}
          </div>
          <LeadForm defaultService={service.slug} />
        </div>
      </section>

      {/* CONTENU */}
      <section className="section-pad">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Ce que nous prenons en charge
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="card mt-8 border-emerald-200 bg-emerald-50 p-6">
              <h3 className="font-bold text-slate-900">Combien ça coûte ?</h3>
              <p className="mt-2 text-slate-700">{service.priceNote}</p>
            </div>

            <FaqSection items={service.faq} />
          </div>

          {/* Sidebar maillage interne */}
          <aside className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold text-slate-900">Autres prestations</h3>
              <ul className="mt-4 space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="flex items-center gap-2 text-sm text-slate-700 hover:text-emerald-700"
                    >
                      <ServiceIcon name={r.iconKey} className="h-4 w-4 text-emerald-600" />
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card bg-slate-900 p-6 text-white">
              <h3 className="font-bold">Un projet ? Parlons-en.</h3>
              <p className="mt-2 text-sm text-slate-300">
                Chiffrage gratuit et sans engagement, réponse sous 72h.
              </p>
              <Link href="/demande-devis" className="btn-accent mt-4">
                Demander un devis
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
