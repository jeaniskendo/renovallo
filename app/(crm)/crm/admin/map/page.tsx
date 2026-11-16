"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useLeads, useArtisans } from "@/components/dashboard/use-data";
import { SERVICES } from "@/lib/data/services";
import type { MapPoint } from "@/components/map/FranceMap";

const FranceMap = dynamic(
  () => import("@/components/map/FranceMap").then((m) => m.FranceMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] w-full animate-pulse rounded-xl bg-slate-200" />
    ),
  }
);

const PERIODS = [
  { value: "month", label: "Ce mois" },
  { value: "30", label: "30 jours" },
  { value: "90", label: "90 jours" },
  { value: "all", label: "Tout" },
];

export default function AdminMapPage() {
  const { data: leads } = useLeads();
  const { data: artisans } = useArtisans();
  const [period, setPeriod] = useState("all");
  const [trade, setTrade] = useState("all");

  const cutoff = useMemo(() => {
    const now = new Date();
    if (period === "month") return new Date(now.getFullYear(), now.getMonth(), 1);
    if (period === "30") return new Date(now.getTime() - 30 * 86400000);
    if (period === "90") return new Date(now.getTime() - 90 * 86400000);
    return new Date(0);
  }, [period]);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const created = l.created_at ? new Date(l.created_at) : null;
      if (created && created < cutoff) return false;
      if (trade !== "all" && l.project_type !== trade) return false;
      return true;
    });
  }, [leads, cutoff, trade]);

  const points: MapPoint[] = useMemo(() => {
    return artisans
      .filter((a) => a.lat != null && a.lng != null)
      .map((a) => {
        const count = filteredLeads.filter((l) => l.assigned_artisan === a.id).length;
        return {
          id: a.id,
          lat: a.lat!,
          lng: a.lng!,
          label: a.company_name ?? a.full_name ?? "Artisan",
          subtitle: `${a.city ?? ""}${a.department ? " (" + a.department + ")" : ""}`,
          value: count,
        };
      });
  }, [artisans, filteredLeads]);

  const ranked = useMemo(
    () => [...points].sort((a, b) => b.value - a.value),
    [points]
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Carte France</h1>
        <p className="text-sm text-slate-500">
          Position des partenaires et volume de leads générés
        </p>
      </header>

      {/* Filtres */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="field-label">Période</label>
          <div className="flex overflow-hidden rounded-lg border border-slate-300">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  period === p.value
                    ? "bg-emerald-700 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="field-label">Métier</label>
          <select
            value={trade}
            onChange={(e) => setTrade(e.target.value)}
            className="field w-56"
          >
            <option value="all">Tous les métiers</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FranceMap points={points} />
        </div>

        <div className="card max-h-[520px] overflow-y-auto p-5">
          <h2 className="font-bold text-slate-900">
            Leads par partenaire ({filteredLeads.length} au total)
          </h2>
          <ul className="mt-4 space-y-3">
            {ranked.length === 0 ? (
              <li className="text-sm text-slate-400">
                Aucun partenaire géolocalisé.
              </li>
            ) : (
              ranked.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                >
                  <div>
                    <p className="font-medium text-slate-900">{p.label}</p>
                    <p className="text-xs text-slate-500">{p.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                    {p.value}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
