import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Clock,
  BadgeCheck,
  ArrowRight,
  FileCheck2,
  ClipboardList,
  HardHat,
  KeyRound,
} from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/CtaSection";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { StatsBand } from "@/components/StatsBand";
import { SERVICES } from "@/lib/data/services";
import { REALISATIONS } from "@/lib/data/testimonials";
import { BLOG_POSTS } from "@/lib/data/blog";
import { CITIES } from "@/lib/data/cities";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Courtier en travaux en Bourgogne-Franche-Comté | Rénovation tous corps de métier",
  description:
    "Le meilleur courtier en travaux de Bourgogne-Franche-Comté. Chiffrage gratuit sous 72h, artisans qualifiés sélectionnés et suivi de chantier de A à Z. Rénovation, isolation, extension : des artisans vérifiés et un prix juste, du chiffrage à la livraison.",
  alternates: { canonical: SITE_URL },
};

const STEPS = [
  {
    icon: ClipboardList,
    title: "Décrivez-nous votre projet en 2 min",
    text: "Choisissez le corps de métier, décrivez votre projet, et ajoutez des photos si nécessaire. Simple et rapide.",
  },
  {
    icon: FileCheck2,
    title: "Nous sélectionnons l'artisan idéal",
    text: "Nous sélectionnons l'artisan idéal et qualifié pour votre projet afin de vous garantir qualité et prix juste.",
  },
  {
    icon: HardHat,
    title: "Contact & visite de l'artisan",
    text: "L'artisan vous contacte rapidement, entre 48 et 72 heures, pour obtenir des compléments d'information, organiser une visite technique si nécessaire, et vous établit un devis.",
  },
  {
    icon: KeyRound,
    title: "Démarrage du chantier",
    text: "Vous signez votre devis, les travaux débutent en accord avec l'artisan et le chantier commence sereinement.",
  },
];

const professionalServiceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "RenovAllo",
  url: SITE_URL,
  description:
    "Courtier en travaux et maître d'œuvre en Bourgogne-Franche-Comté. Rénovation globale, énergétique, extension et tous corps de métier.",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Bourgogne-Franche-Comté",
  },
  priceRange: "€€",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations de rénovation",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      name: s.name,
      url: `${SITE_URL}/services/${s.slug}`,
    })),
  },
};

export default function HomePage() {
  const featuredServices = SERVICES.slice(0, 8);
  const topCities = CITIES.slice(0, 12);

  return (
    <>
      <JsonLd data={professionalServiceLd} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
        <div className="container-site grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              Maître d&apos;œuvre · Courtier en travaux
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Courtier en travaux en Bourgogne-Franche-Comté
            </h1>
            <p className="mt-4 max-w-xl text-lg text-emerald-50">
              Rénovation, isolation, extension, tous corps de métier. Des
              artisans qualifiés, un chiffrage gratuit sous 72h et un prix
              juste, de la visite à la livraison.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#devis" className="btn-accent">
                Chiffrer mes travaux
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/services"
                className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                Voir nos métiers
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-100">
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Gratuit & sans engagement
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Réponse sous 72h
              </li>
              <li className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Artisans certifiés
              </li>
            </ul>
          </div>

          <div id="devis" className="lg:pl-6">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* STATS */}
      <StatsBand />

      {/* MÉTHODE */}
      <section className="section-pad">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Notre méthode
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Votre processus de rénovation en 4 étapes
            </h2>
            <p className="mt-3 text-slate-600">
              Garantie de qualité et du prix juste avec votre courtier
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="card relative p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <span className="absolute right-5 top-5 text-4xl font-extrabold text-slate-100">
                  {i + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Nos prestations
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Tous les corps de métier, un accompagnement complet
              </h2>
            </div>
            <Link href="/services" className="btn-outline">
              Tous les métiers
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card group flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <ServiceIcon name={s.iconKey} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900 group-hover:text-emerald-700">
                  {s.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                  Découvrir
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RÉALISATIONS */}
      <section className="section-pad">
        <div className="container-site">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-slate-900">
              Chantiers réalisés
            </h2>
            <Link href="/realisations" className="btn-outline">
              Tout voir
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {REALISATIONS.slice(0, 3).map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.serviceSlug}`}
                className="card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <ServiceIcon
                    name={
                      SERVICES.find((s) => s.slug === r.serviceSlug)?.iconKey ??
                      "home"
                    }
                    className="h-12 w-12 text-slate-400"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900">{r.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {r.city} · {r.surface}
                  </p>
                  <p className="mt-2 text-lg font-bold text-emerald-700">
                    {r.amount}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* BLOG */}
      <section className="section-pad">
        <div className="container-site">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Conseils & guides
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Bien préparer son projet
              </h2>
            </div>
            <Link href="/blog" className="btn-outline">
              Tous les articles
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card group flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {p.category}
                </p>
                <h3 className="mt-2 font-bold text-slate-900 group-hover:text-emerald-700">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{p.excerpt}</p>
                <p className="mt-4 text-xs text-slate-400">
                  {p.readTime} de lecture
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        items={[
          {
            q: "Combien coûte un courtier en travaux ?",
            a: "Le courtier se rémunère généralement en pourcentage du chantier ou via des honoraires fixes affichés dès le départ. Chez RenovAllo, le chiffrage est gratuit et sans engagement.",
          },
          {
            q: "Dans quelles villes intervenez-vous ?",
            a: "Nous intervenons dans toute la Bourgogne-Franche-Comté : Dijon, Besançon, Chalon-sur-Saône, Mâcon, Auxerre, Nevers, Belfort et toutes les communes des 8 départements.",
          },
          {
            q: "Sous quel délai recevrai-je mon chiffrage ?",
            a: "Nous nous engageons à vous transmettre un chiffrage complet sous 72h après votre demande, gratuitement et sans engagement.",
          },
        ]}
      />

      {/* SECTEURS */}
      <section className="section-pad bg-slate-50">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              Nous intervenons dans toute la Bourgogne-Franche-Comté
            </h2>
            <p className="mt-3 text-slate-600">
              Un courtier en travaux local, présent dans les 8 départements de
              la région.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {topCities.map((c) => (
              <Link
                key={c.slug}
                href={`/villes/${c.slug}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 transition-colors hover:border-emerald-600 hover:text-emerald-700"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/villes"
              className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Voir tous nos secteurs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
