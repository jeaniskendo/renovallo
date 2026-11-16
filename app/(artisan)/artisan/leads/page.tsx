"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrentProfile, useLeads } from "@/components/dashboard/use-data";
import { Badge, LEAD_STATUS } from "@/components/dashboard/common";
import { LeadPhotos } from "@/components/dashboard/LeadPhotos";
import { SERVICES } from "@/lib/data/services";
import { formatDate, formatEUR } from "@/lib/utils";
import type { Lead, LeadStatus } from "@/lib/types";

const STATUS_ORDER: LeadStatus[] = [
  "nouveau",
  "contacte",
  "qualifie",
  "devis_envoye",
  "signe",
  "perdu",
];

export default function ArtisanLeadsPage() {
  const { userId } = useCurrentProfile();
  const { data: leads, loading } = useLeads();
  const [feedback, setFeedback] = useState<string | null>(null);

  async function updateStatus(id: string, status: LeadStatus) {
    const supabase = createClient();
    await supabase.from("leads").update({ status }).eq("id", id);
  }

  async function createChantier(lead: Lead) {
    if (!userId) return;
    const supabase = createClient();
    const service = SERVICES.find((s) => s.slug === lead.project_type);
    await supabase.from("chantiers").insert({
      artisan_id: userId,
      lead_id: lead.id,
      title: service?.name ?? lead.project_type,
      client_name: `${lead.first_name ?? ""} ${lead.last_name ?? ""}`.trim(),
      city: lead.city,
      amount: lead.budget_max,
      status: "prospect",
    });
    setFeedback(`Chantier créé pour ${lead.first_name} ${lead.last_name}.`);
    setTimeout(() => setFeedback(null), 3000);
  }

  async function createDevis(lead: Lead) {
    if (!userId) return;
    const supabase = createClient();
    const ref = `DV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    await supabase.from("devis").insert({
      artisan_id: userId,
      lead_id: lead.id,
      reference: ref,
      amount: lead.budget_max,
      status: "brouillon",
    });
    setFeedback(`Devis ${ref} créé.`);
    setTimeout(() => setFeedback(null), 3000);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Mes leads</h1>
        <p className="text-sm text-slate-500">
          Les demandes qui vous ont été assignées
        </p>
      </header>

      {feedback && (
        <div className="rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          {feedback}
        </div>
      )}

      {loading ? (
        <p className="text-slate-400">Chargement…</p>
      ) : leads.length === 0 ? (
        <div className="card p-8 text-center text-slate-500">
          Aucun lead assigné pour le moment.
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((l) => {
            const service = SERVICES.find((s) => s.slug === l.project_type);
            const status = LEAD_STATUS[l.status];
            return (
              <div key={l.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-slate-900">
                        {l.first_name} {l.last_name}
                      </h2>
                      <Badge className={status.className}>{status.label}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {service?.name ?? l.project_type} · {l.city} {l.postal_code}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      <a href={`mailto:${l.email}`} className="text-emerald-700">
                        {l.email}
                      </a>
                      {l.phone && ` · ${l.phone}`}
                    </p>
                    {l.description && (
                      <p className="mt-2 text-sm text-slate-500">{l.description}</p>
                    )}
                    <LeadPhotos photos={l.photos} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {l.budget_max != null && (
                      <span className="text-lg font-bold text-emerald-700">
                        {formatEUR(l.budget_max)}
                      </span>
                    )}
                    <span className="text-xs text-slate-400">
                      Reçu le {formatDate(l.created_at)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                  <select
                    value={l.status}
                    onChange={(e) => updateStatus(l.id, e.target.value as LeadStatus)}
                    className="field w-auto py-1.5 text-xs"
                  >
                    {STATUS_ORDER.map((s) => (
                      <option key={s} value={s}>
                        {LEAD_STATUS[s].label}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => createChantier(l)} className="btn-outline px-4 py-1.5 text-xs">
                    Créer un chantier
                  </button>
                  <button onClick={() => createDevis(l)} className="btn-outline px-4 py-1.5 text-xs">
                    Créer un devis
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
