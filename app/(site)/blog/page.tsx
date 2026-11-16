import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/data/blog";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Conseils & guides rénovation | Prix, aides et astuces en Bourgogne-Franche-Comté",
  description:
    "Prix au m², aides MaPrimeRénov', choix d'un courtier en travaux : nos guides et conseils pour réussir votre projet de rénovation en Bourgogne-Franche-Comté.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Conseils & guides" }]} />
      <section className="section-pad pt-4">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold text-slate-900">
              Conseils & guides rénovation
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Prix, aides financières, choix des artisans : tout ce qu&apos;il
              faut savoir pour réussir votre projet en Bourgogne-Franche-Comté.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card group flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    {p.category}
                  </p>
                  <p className="text-xs text-slate-400">{p.readTime}</p>
                </div>
                <h2 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-emerald-700">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-slate-600">{p.excerpt}</p>
                <p className="mt-4 text-xs text-slate-400">
                  {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
                    new Date(p.date)
                  )}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
