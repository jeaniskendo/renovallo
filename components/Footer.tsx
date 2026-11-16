import Link from "next/link";
import { Hammer } from "lucide-react";
import { CITIES } from "@/lib/data/cities";
import { DEPARTMENTS } from "@/lib/data/departments";
import { SERVICES } from "@/lib/data/services";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export function Footer() {
  const serviceLinks = SERVICES.slice(0, 10);

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-950 text-slate-300">
      {/* Bandeau CTA */}
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="container-site flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold text-white">
              Prêt à lancer votre projet de rénovation ?
            </p>
            <p className="text-sm text-slate-400">
              Chiffrage gratuit · Réponse sous 72h · Sans engagement
            </p>
          </div>
          <Link href="/demande-devis" className="btn-accent">
            Chiffrer mes travaux gratuitement
          </Link>
        </div>
      </div>

      <div className="container-site grid grid-cols-2 gap-10 py-14 md:grid-cols-3 lg:grid-cols-5">
        {/* Marque */}
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <Hammer className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-white">
              RENOV<span className="text-emerald-500">ALLO</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-slate-400">
            Votre courtier en travaux tous corps de métier en
            Bourgogne-Franche-Comté. Des artisans vérifiés et un prix juste,
            de la visite à la livraison.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-emerald-400 hover:text-emerald-300"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        {/* Métiers */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Nos métiers
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {serviceLinks.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-slate-400 transition-colors hover:text-emerald-400"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="font-medium text-emerald-400 hover:text-emerald-300"
              >
                Tous les métiers →
              </Link>
            </li>
          </ul>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            RenovAllo
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-slate-400 hover:text-emerald-400">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-slate-400 hover:text-emerald-400">
                Nos métiers
              </Link>
            </li>
            <li>
              <Link href="/villes" className="text-slate-400 hover:text-emerald-400">
                Nos secteurs
              </Link>
            </li>
            <li>
              <Link href="/realisations" className="text-slate-400 hover:text-emerald-400">
                Réalisations
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-slate-400 hover:text-emerald-400">
                Conseils & guides
              </Link>
            </li>
            <li>
              <Link href="/demande-devis" className="text-slate-400 hover:text-emerald-400">
                Demander un devis
              </Link>
            </li>
          </ul>
        </div>

        {/* Villes par département */}
        <div className="col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Nos secteurs d&apos;intervention
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dep) => {
              const cities = CITIES.filter(
                (c) => c.departmentCode === dep.code
              );
              return (
                <div key={dep.code}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                    {dep.name} ({dep.code})
                  </p>
                  <ul className="space-y-1 text-sm">
                    {cities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={`/villes/${city.slug}`}
                          className="text-slate-500 transition-colors hover:text-emerald-400"
                        >
                          {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © 2026 {SITE_NAME}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/mentions-legales" className="hover:text-emerald-400">
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="hover:text-emerald-400"
            >
              Politique de confidentialité
            </Link>
            <Link href="/sitemap.xml" className="hover:text-emerald-400">
              Plan du site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
