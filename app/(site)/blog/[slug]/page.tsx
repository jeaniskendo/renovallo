import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getPost, getRelatedPosts, BLOG_POSTS } from "@/lib/data/blog";
import { FaqSection } from "@/components/FaqSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: { "@type": "Organization", name: "RenovAllo" },
    publisher: { "@type": "Organization", name: "RenovAllo" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Conseils & guides", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="section-pad pt-4">
        <div className="container-site max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            {post.category}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-slate-500">
            Mis à jour le{" "}
            {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
              new Date(post.date)
            )}{" "}
            · {post.readTime} de lecture
          </p>

          <div className="mt-8 space-y-8">
            {post.content.map((block, i) => (
              <div key={i}>
                {block.heading && (
                  <h2 className="mb-3 text-2xl font-bold text-slate-900">
                    {block.heading}
                  </h2>
                )}
                {block.body.map((p, j) => (
                  <p
                    key={j}
                    className={
                      i === 0 && j === 0
                        ? "text-lg leading-relaxed text-slate-700"
                        : "mt-3 leading-relaxed text-slate-600"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {post.faq.length > 0 && <FaqSection items={post.faq} />}
        </div>
      </article>

      {/* Articles liés */}
      <section className="section-pad bg-slate-50 pt-0">
        <div className="container-site">
          <h2 className="text-xl font-bold text-slate-900">
            À lire également
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((p) => (
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
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                  Lire
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
