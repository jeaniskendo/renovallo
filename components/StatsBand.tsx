"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 19, label: "corps de métier" },
  { value: 8, label: "départements couverts" },
  { value: 72, suffix: "h", label: "chiffrage gratuit" },
  { value: 98, suffix: "%", label: "clients satisfaits" },
];

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const rafId = useRef<number | null>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function start() {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) rafId.current = requestAnimationFrame(tick);
      };
      rafId.current = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible.current) {
              isVisible.current = true;
              setValue(0);
              start();
            }
          } else {
            isVisible.current = false;
            if (rafId.current != null) cancelAnimationFrame(rafId.current);
            rafId.current = null;
            setValue(0);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [target, duration]);

  return { ref, value };
}

function Stat({ value, suffix = "", label }: StatItem) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div>
      <p className="text-3xl font-extrabold text-emerald-700">
        <span ref={ref}>{current}</span>
        {suffix}
      </p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}

export function StatsBand() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="container-site grid grid-cols-2 gap-6 py-8 text-center md:grid-cols-4">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
