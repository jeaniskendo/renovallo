"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrentProfile, useDevis } from "@/components/dashboard/use-data";
import { DEVIS_STATUS } from "@/components/dashboard/common";
import { formatDate, formatEUR } from "@/lib/utils";
import type { DevisStatus } from "@/lib/types";

const STATUS_ORDER: DevisStatus[] = ["brouillon", "envoye", "accepte", "refuse"];

export default function ArtisanDevisPage() {
  const { userId } = useCurrentProfile();
  const { data: devis, loading } = useDevis();
  const [showForm, setShowForm] = useState(false);
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<DevisStatus>("brouillon");

  async function createDevis(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    const supabase = createClient();
    const ref = `DV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    await supabase.from("devis").insert({
      artisan_id: userId,
      reference: ref,
      amount: amount ? Number(amount) : null,
      status,
    });
    setClientName("");
    setAmount("");
    setShowForm(false);
  }

  async function updateStatus(id: string, s: DevisStatus) {
    const supabase = createClient();
    await supabase.from("devis").update({ status: s }).eq("id", id);
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from("devis").delete().eq("id", id);
  }

  const total = devis.reduce((acc, d) => acc + Number(d.amount ?? 0), 0);
  const accepted = devis.filter((d) => d.status === "accepte").length;

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes devis</h1>
          <p className="text-sm text-slate-500">
            {devis.length} devis · {accepted} accepté(s) · {formatEUR(total)}
          </p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? "Fermer" : "Nouveau devis"}
        </button>
      </header>

      {showForm && (
        <form onSubmit={createDevis} className="card grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
          <div>
            <label className="field-label">Client</label>
            <input required value={clientName} onChange={(e) => setClientName(e.target.value)} className="field" />
          </div>
          <div>
            <label className="field-label">Montant (€)</label>
            <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} className="field" />
          </div>
          <div>
            <label className="field-label">Statut</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as DevisStatus)} className="field">
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>{DEVIS_STATUS[s].label}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-3">
            <button type="submit" className="btn-primary">Ajouter le devis</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-slate-400">Chargement…</p>
      ) : devis.length === 0 ? (
        <div className="card p-8 text-center text-slate-500">Aucun devis.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase text-slate-500">
                <th className="px-4 py-3">Référence</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {devis.map((d) => {
                return (
                  <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{d.reference ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{formatEUR(d.amount)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={d.status}
                        onChange={(e) => updateStatus(d.id, e.target.value as DevisStatus)}
                        className="field py-1.5 text-xs"
                      >
                        {STATUS_ORDER.map((st) => (
                          <option key={st} value={st}>{DEVIS_STATUS[st].label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDate(d.created_at)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => remove(d.id)}
                        className="text-xs font-medium text-red-600 hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
