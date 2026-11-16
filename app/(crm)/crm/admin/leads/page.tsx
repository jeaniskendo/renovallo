"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLeads, useArtisans } from "@/components/dashboard/use-data";
import { LEAD_STATUS } from "@/components/dashboard/common";
import { LeadPhotos } from "@/components/dashboard/LeadPhotos";
import { SERVICES } from "@/lib/data/services";
import { formatDate, formatEUR } from "@/lib/utils";
import type { LeadStatus } from "@/lib/types";

const STATUS_ORDER: LeadStatus[] = [
  "nouveau",
  "contacte",
  "qualifie",
  "devis_envoye",
  "signe",
  "perdu",
];

export default function AdminLeadsPage() {
  const { data: leads, loading } = useLeads();
  const { data: artisans } = useArtisans();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${l.first_name} ${l.last_name} ${l.email} ${l.city} ${l.project_type}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [leads, statusFilter, query]);

  async function updateStatus(leadId: string, status: LeadStatus) {
    const supabase = createClient();
    await supabase.from("leads").update({ status }).eq("id", leadId);
  }

  async function assign(leadId: string, artisanId: string) {
    const supabase = createClient();
    if (!artisanId) {
      await supabase
        .from("leads")
        .update({ assigned_artisan: null, assigned_at: null })
        .eq("id", leadId);
      return;
    }
    await supabase
      .from("leads")
      .update({
        assigned_artisan: artisanId,
        assigned_at: new Date().toISOString(),
        status: "contacte",
      })
      .eq("id", leadId);

    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
    const { data: quota } = await supabase
      .from("quotas")
      .select("*")
      .eq("artisan_id", artisanId)
      .eq("month", month)
      .maybeSingle();

    if (quota) {
      await supabase
        .from("quotas")
        .update({ used_leads: (quota.used_leads ?? 0) + 1 })
        .eq("id", quota.id);
    } else {
      await supabase
        .from("quotas")
        .insert({ artisan_id: artisanId, month, max_leads: 0, used_leads: 1 });
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
        <p className="text-sm text-slate-500">
          {leads.length} demandes au total
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher (nom, email, ville…)"
          className="field max-w-sm"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="field max-w-xs"
        >
          <option value="all">Tous les statuts</option>
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS[s].label}
            </option>
          ))}
        </select>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase text-slate-500">
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Projet</th>
              <th className="px-4 py-3">Localisation</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Artisan assigné</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  Chargement…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  Aucun lead trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((l) => {
                const service = SERVICES.find((s) => s.slug === l.project_type);
                return (
                  <tr key={l.id} className="border-b border-slate-100 align-top hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">
                        {l.first_name} {l.last_name}
                      </p>
                      <a href={`mailto:${l.email}`} className="text-xs text-emerald-700">
                        {l.email}
                      </a>
                      {l.phone && <p className="text-xs text-slate-500">{l.phone}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-800">{service?.name ?? l.project_type ?? "—"}</p>
                      {l.description && (
                        <p className="mt-1 line-clamp-2 text-xs text-slate-500">{l.description}</p>
                      )}
                      <LeadPhotos photos={l.photos} />
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {l.city ?? "—"}
                      <p className="text-xs text-slate-400">{l.department}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {l.budget_max != null ? formatEUR(l.budget_max) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onChange={(e) => updateStatus(l.id, e.target.value as LeadStatus)}
                        className="field py-1.5 text-xs"
                      >
                        {STATUS_ORDER.map((s) => (
                          <option key={s} value={s}>
                            {LEAD_STATUS[s].label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={l.assigned_artisan ?? ""}
                        onChange={(e) => assign(l.id, e.target.value)}
                        className="field py-1.5 text-xs"
                      >
                        <option value="">— Non assigné —</option>
                        {artisans.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.company_name ?? a.full_name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDate(l.created_at)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
