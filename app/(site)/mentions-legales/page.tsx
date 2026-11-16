import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Mentions légales" }]} />
      <section className="section-pad pt-4">
        <div className="container-site max-w-3xl">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Mentions légales
          </h1>

          <div className="mt-8 space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-900">Éditeur du site</h2>
              <p className="mt-2">
                Le site {SITE_NAME} est édité par [Raison sociale de la société],
                [forme juridique], au capital de [montant] €, immatriculée au RCS
                de [ville] sous le numéro [numéro SIREN].
              </p>
              <p className="mt-2">
                Siège social : [adresse complète]. N° TVA intracommunautaire :
                [numéro TVA].
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">Contact</h2>
              <p className="mt-2">
                Email :{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-700">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Directeur de la publication
              </h2>
              <p className="mt-2">[Nom du directeur de la publication]</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">Hébergement</h2>
              <p className="mt-2">
                Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133,
                Walnut, CA 91789, États-Unis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Propriété intellectuelle
              </h2>
              <p className="mt-2">
                L&apos;ensemble des contenus (textes, images, logos, éléments
                graphiques) est protégé par le droit d&apos;auteur et demeure la
                propriété exclusive de {SITE_NAME}. Toute reproduction est
                interdite sans autorisation écrite préalable.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
