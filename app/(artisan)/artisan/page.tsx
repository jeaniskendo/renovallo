"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Users, ClipboardList, Euro, Gauge, ArrowRight } from "lucide-react";
import {
  useCurrentProfile,
  useLeads,
  useChantiers,
  useDevis,
  useQuotas,
} from "@/components/dashboard/use-data";
import { KpiCard, Badge, LEAD_STATUS, CHANTIER_STATUS } from "@/components/dashboard/common";
import { SERVICES } from "@/lib/data/services";
import { formatEUR, formatDate } from "@/lib/utils";

export default function ArtisanDashboardPage() {
  const { profile, loading: profileLoading } = useCurrentProfile();
  const { data: leads } = useLeads();
  const { data: chantiers } = useChantiers();
  const { data: devis } = useDevis();
  const { data: quotas } = useQuotas();

  const stats = useMemo(() => {
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
    const quota = quotas.find((q) => q.month === month);
    const used = quota?.used_leads ?? 0;
    const max = quota?.max_leads ?? profile?.quota_monthly ?? 0;
    const leadsThisMonth = leads.filter((l) => l.created_at?.slice(0, 7) === month.slice(0, 7)).length;
    const enCours = chantiers.filter(
      (c) => c.status === "en_cours" || c.status === "planifie" || c.status === "devis"
    ).length;
    const ca = chantiers.reduce((acc, c) => acc + Number(c.amount ?? 0), 0);
    const pct = max > 0 ? Math.min(100, Math.round((used / max) * 100)) : 0;
    return { used, max, leadsThisMonth, enCours, ca, pct, month };
  }, [quotas, leads, chantiers, profile]);

  if (profileLoading) {
    return <p className="text-slate-400">Chargement…</p>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Bonjour, {profile?.full_name ?? profile?.company_name ?? "artisan"} 👋
        </h1>
        <p className="text-sm text-slate-500">
          Voici l&apos;activité de votre compte partenaire
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Leads ce mois" value={stats.leadsThisMonth} icon={Users} />
        <KpiCard label="Chantiers en cours" value={stats.enCours} icon={ClipboardList} accent="bg-blue-100 text-blue-700" />
        <KpiCard label="Chiffre d'affaires" value={formatEUR(stats.ca)} icon={Euro} accent="bg-violet-100 text-violet-700" />
        <KpiCard label="Devis émis" value={devis.length} icon={Gauge} accent="bg-amber-100 text-amber-700" />
      </div>

      {/* Quota */}
      <div className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Votre quota de leads</h2>
          <span className="text-sm font-semibold text-slate-600">
            {stats.used} / {stats.max} leads ce mois
          </span>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${stats.pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {stats.max === 0
            ? "Aucun quota défini. Contactez RenovAllo pour activer votre forfait."
            : `${Math.max(0, stats.max - stats.used)} lead(s) restant(s) ce mois`}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Leads récents */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Vos leads récents</h2>
            <Link
              href="/artisan/leads"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700"
            >
              Tout voir <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {leads.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">
                Aucun lead assigné pour le moment.
              </p>
            ) : (
              leads.slice(0, 5).map((l) => {
                const service = SERVICES.find((s) => s.slug === l.project_type);
                const status = LEAD_STATUS[l.status];
                return (
                  <div
                    key={l.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 p-3"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {l.first_name} {l.last_name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {service?.name ?? l.project_type} · {l.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {l.budget_max != null && (
                        <span className="text-sm font-semibold text-slate-700">
                          {formatEUR(l.budget_max)}
                        </span>
                      )}
                      <Badge className={status.className}>{status.label}</Badge>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chantiers récents */}
        <div className="card p-5">
          <h2 className="font-bold text-slate-900">Vos chantiers</h2>
          <div className="mt-4 space-y-3">
            {chantiers.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">
                Aucun chantier.
              </p>
            ) : (
              chantiers.slice(0, 5).map((c) => {
                const status = CHANTIER_STATUS[c.status];
                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 p-3"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {c.title ?? c.client_name ?? "Chantier"}
                      </p>
                      <p className="text-xs text-slate-500">{formatDate(c.created_at)}</p>
                    </div>
                    <Badge className={status.className}>{status.label}</Badge>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
