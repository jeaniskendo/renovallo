import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Témoignages
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Ce que disent nos clients en Bourgogne-Franche-Comté
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 6).map((t) => (
            <figure key={t.author} className="card flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="flex gap-0.5" aria-label={`${t.rating} sur 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-slate-900">{t.author}</span>
                <span className="block text-slate-500">{t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
