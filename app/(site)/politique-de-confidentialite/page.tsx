import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_URL, SITE_NAME, CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité du site ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/politique-de-confidentialite` },
  robots: { index: false },
};

export default function ConfidentialitePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Politique de confidentialité" }]} />
      <section className="section-pad pt-4">
        <div className="container-site max-w-3xl">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Politique de confidentialité
          </h1>

          <div className="mt-8 space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Données collectées
              </h2>
              <p className="mt-2">
                Lors de votre demande de devis, nous collectons les informations
                que vous nous communiquez : nom, prénom, adresse email, numéro de
                téléphone (facultatif), code postal, ville et description de
                votre projet. Ces données sont nécessaires au traitement de votre
                demande.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Finalité du traitement
              </h2>
              <p className="mt-2">
                Vos données sont utilisées uniquement pour traiter votre demande
                de chiffrage, vous recontacter et assurer le suivi de votre
                projet. Elles ne sont jamais revendues ni cédées à des tiers à
                des fins publicitaires.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Conservation des données
              </h2>
              <p className="mt-2">
                Les données relatives aux demandes de devis sont conservées
                pendant la durée nécessaire à la gestion de la relation
                commerciale, dans la limite des délais légaux en vigueur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">Vos droits</h2>
              <p className="mt-2">
                Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès,
                de rectification, d&apos;effacement et d&apos;opposition sur vos
                données. Pour l&apos;exercer, contactez-nous à l&apos;adresse{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-700">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">Cookies</h2>
              <p className="mt-2">
                Le site {SITE_NAME} n&apos;utilise pas de cookies de suivi
                publicitaire. Seuls des cookies techniques strictement
                nécessaires au fonctionnement du site peuvent être déposés.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
