import type { Metadata } from "next";
import { ShieldCheck, Clock, BadgeCheck, CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { FaqSection } from "@/components/FaqSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Demander un devis gratuit | Rénovation en Bourgogne-Franche-Comté",
  description:
    "Obtenez votre chiffrage gratuit sous 72h pour vos travaux de rénovation en Bourgogne-Franche-Comté. Sans engagement, artisans qualifiés sélectionnés.",
  alternates: { canonical: `${SITE_URL}/demande-devis` },
  robots: { index: true, follow: true },
};

const BENEFITS = [
  "Chiffrage gratuit et détaillé sous 72h",
  "Artisans qualifiés, assurés et vérifiés",
  "Un seul contact, de la visite à la livraison",
  "Comparaison et négociation des devis",
  "Artisans locaux, certifiés RGE et garantis décennale",
  "Un prix juste et transparent, négocié pour vous",
  "Visite technique et conseils gratuits, sans engagement",
  "Un artisan proche de chez vous, en Bourgogne-Franche-Comté",
];

export default function DemandeDevisPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Demander un devis gratuit",
    url: `${SITE_URL}/demande-devis`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ label: "Demander un devis" }]} />

      <section className="section-pad pt-4">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">
              Demandez votre devis gratuit
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Décrivez votre projet : notre équipe de courtiers en travaux vous
              répond sous 72h avec un chiffrage complet et sans engagement.
            </p>

            <ul className="mt-8 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                Sans engagement
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                Réponse sous 72h
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                Artisans certifiés
              </span>
            </div>
          </div>

          <LeadForm />
        </div>
      </section>

      <FaqSection
        items={[
          {
            q: "Le chiffrage est-il vraiment gratuit ?",
            a: "Oui. Le chiffrage, la visite technique et les conseils sont entièrement gratuits et sans engagement. Vous ne payez rien tant que vous n'avez pas validé votre projet.",
          },
          {
            q: "Sous quel délai serai-je recontacté ?",
            a: "Nous nous engageons à vous transmettre un chiffrage complet sous 72h ouvrées après réception de votre demande.",
          },
          {
            q: "Mes données sont-elles protégées ?",
            a: "Vos données sont utilisées uniquement pour traiter votre demande de devis et ne sont jamais revendues à des tiers. Consultez notre politique de confidentialité.",
          },
        ]}
      />
    </>
  );
}
