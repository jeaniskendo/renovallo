"use client";

import { useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useArtisans, useQuotas } from "@/components/dashboard/use-data";
import { Badge } from "@/components/dashboard/common";
import { SERVICES } from "@/lib/data/services";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export default function AdminArtisansPage() {
  const { data: artisans, loading } = useArtisans();
  const { data: quotas, refresh: refreshQuotas } = useQuotas();

  const month = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  }, []);

  async function updateQuota(a: Profile, value: number) {
    const supabase = createClient();
    await supabase.from("profiles").update({ quota_monthly: value }).eq("id", a.id);
  }

  async function toggleActive(a: Profile) {
    const supabase = createClient();
    await supabase.from("profiles").update({ active: !a.active }).eq("id", a.id);
  }

  async function setMonthQuota(a: Profile, max: number) {
    const supabase = createClient();
    const existing = quotas.find((q) => q.artisan_id === a.id && q.month === month);
    if (existing) {
      await supabase.from("quotas").update({ max_leads: max }).eq("id", existing.id);
    } else {
      await supabase
        .from("quotas")
        .insert({ artisan_id: a.id, month, max_leads: max, used_leads: 0 });
    }
    refreshQuotas();
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Artisans partenaires</h1>
          <p className="text-sm text-slate-500">
            Gérez les quotas de leads et l&apos;activité de vos artisans
          </p>
        </div>
      </header>

      <div className="card p-4 text-sm text-slate-600">
        Pour ajouter un artisan : créez un utilisateur dans{" "}
        <span className="font-medium">Supabase → Authentication → Users</span> avec le
        rôle <code className="rounded bg-slate-100 px-1">artisan</code> (métadonnées). Son
        profil sera automatiquement créé et apparaîtra ici.
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-slate-400">Chargement…</p>
        ) : artisans.length === 0 ? (
          <div className="card p-8 text-center text-slate-500">
            Aucun artisan partenaire pour le moment.
          </div>
        ) : (
          artisans.map((a) => {
            const quota = quotas.find((q) => q.artisan_id === a.id && q.month === month);
            const used = quota?.used_leads ?? 0;
            const max = quota?.max_leads ?? a.quota_monthly ?? 0;
            const tradeName = a.trade
              ? SERVICES.find((s) => s.slug === a.trade)?.name ?? a.trade
              : "—";
            const pct = max > 0 ? Math.min(100, Math.round((used / max) * 100)) : 0;

            return (
              <div key={a.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-slate-900">
                        {a.company_name ?? a.full_name}
                      </h2>
                      <Badge className={a.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}>
                        {a.active ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {tradeName} · {a.city} ({a.department})
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-600">Actif</label>
                    <button
                      onClick={() => toggleActive(a)}
                      className={cn(
                        "relative h-6 w-11 rounded-full transition-colors",
                        a.active ? "bg-emerald-600" : "bg-slate-300"
                      )}
                      aria-label="Basculer l'activité"
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all",
                          a.active ? "left-5" : "left-0.5"
                        )}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="field-label">Quota mensuel (par défaut)</label>
                    <input
                      type="number"
                      min={0}
                      value={a.quota_monthly ?? 0}
                      onChange={(e) => updateQuota(a, parseInt(e.target.value, 10) || 0)}
                      className="field"
                    />
                  </div>
                  <div>
                    <label className="field-label">Quota du mois en cours</label>
                    <input
                      type="number"
                      min={0}
                      value={max}
                      onChange={(e) => setMonthQuota(a, parseInt(e.target.value, 10) || 0)}
                      className="field"
                    />
                  </div>
                  <div>
                    <label className="field-label">
                      Consommation ({used}/{max})
                    </label>
                    <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-emerald-600 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{used} leads utilisés ce mois</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
