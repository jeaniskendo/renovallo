"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCurrentProfile, useChantiers } from "@/components/dashboard/use-data";
import { CHANTIER_STATUS } from "@/components/dashboard/common";
import { formatDate, formatEUR } from "@/lib/utils";
import type { ChantierStatus } from "@/lib/types";

const STATUS_ORDER: ChantierStatus[] = [
  "prospect",
  "devis",
  "planifie",
  "en_cours",
  "termine",
  "facture",
];

export default function ArtisanChantiersPage() {
  const { userId } = useCurrentProfile();
  const { data: chantiers, loading } = useChantiers();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<ChantierStatus>("prospect");

  async function createChantier(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    const supabase = createClient();
    await supabase.from("chantiers").insert({
      artisan_id: userId,
      title,
      client_name: clientName,
      city,
      amount: amount ? Number(amount) : null,
      status,
    });
    setTitle("");
    setClientName("");
    setCity("");
    setAmount("");
    setShowForm(false);
  }

  async function updateStatus(id: string, s: ChantierStatus) {
    const supabase = createClient();
    await supabase.from("chantiers").update({ status: s }).eq("id", id);
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from("chantiers").delete().eq("id", id);
  }

  const total = chantiers.reduce((acc, c) => acc + Number(c.amount ?? 0), 0);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes chantiers</h1>
          <p className="text-sm text-slate-500">
            {chantiers.length} chantier(s) · {formatEUR(total)}
          </p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? "Fermer" : "Nouveau chantier"}
        </button>
      </header>

      {showForm && (
        <form onSubmit={createChantier} className="card grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
          <div>
            <label className="field-label">Intitulé</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className="field" />
          </div>
          <div>
            <label className="field-label">Client</label>
            <input value={clientName} onChange={(e) => setClientName(e.target.value)} className="field" />
          </div>
          <div>
            <label className="field-label">Ville</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className="field" />
          </div>
          <div>
            <label className="field-label">Montant (€)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="field" />
          </div>
          <div>
            <label className="field-label">Statut</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as ChantierStatus)} className="field">
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>{CHANTIER_STATUS[s].label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full">Ajouter</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-slate-400">Chargement…</p>
      ) : chantiers.length === 0 ? (
        <div className="card p-8 text-center text-slate-500">Aucun chantier.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase text-slate-500">
                <th className="px-4 py-3">Chantier</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Ville</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {chantiers.map((c) => {
                return (
                  <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{c.title ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-600">{c.client_name ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-600">{c.city ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{formatEUR(c.amount)}</td>
                    <td className="px-4 py-3">
                      <select
                        value={c.status}
                        onChange={(e) => updateStatus(c.id, e.target.value as ChantierStatus)}
                        className="field py-1.5 text-xs"
                      >
                        {STATUS_ORDER.map((st) => (
                          <option key={st} value={st}>{CHANTIER_STATUS[st].label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDate(c.created_at)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => remove(c.id)}
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
