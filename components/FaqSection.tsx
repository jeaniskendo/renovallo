import { JsonLd } from "@/components/JsonLd";

export interface FaqEntry {
  q: string;
  a: string;
}

export function FaqSection({ items }: { items: FaqEntry[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="section-pad">
      <div className="container-site max-w-3xl">
        <JsonLd data={jsonLd} />
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Questions fréquentes
        </h2>
        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-200 bg-white open:shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-slate-800 marker:content-none">
                {item.q}
                <span className="text-emerald-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
