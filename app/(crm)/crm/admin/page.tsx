"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  HardHat,
  Euro,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useLeads, useArtisans } from "@/components/dashboard/use-data";
import { KpiCard, Badge, LEAD_STATUS } from "@/components/dashboard/common";
import { SERVICES } from "@/lib/data/services";
import { formatEUR, formatDate } from "@/lib/utils";
import type { Lead } from "@/lib/types";

const PIE_COLORS = [
  "#047857",
  "#0ea5e9",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#14b8a6",
  "#6366f1",
];

function budgetOf(lead: Lead): number {
  if (lead.budget_max != null) return Number(lead.budget_max);
  if (lead.budget_min != null) return Number(lead.budget_min);
  return 0;
}

export default function AdminDashboardPage() {
  const { data: leads, loading: leadsLoading } = useLeads();
  const { data: artisans } = useArtisans();

  const stats = useMemo(() => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const total = leads.length;
    const thisMonth = leads.filter((l) => l.created_at?.slice(0, 7) === monthKey).length;
    const activeArtisans = artisans.filter((a) => a.active).length;
    const totalBudget = leads.reduce((acc, l) => acc + budgetOf(l), 0);
    const signed = leads.filter((l) => l.status === "signe").length;
    const conversion = total > 0 ? Math.round((signed / total) * 100) : 0;

    // Timeline par mois (6 derniers mois)
    const timelineMap = new Map<string, number>();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      timelineMap.set(key, 0);
    }
    leads.forEach((l) => {
      const key = l.created_at?.slice(0, 7);
      if (key && timelineMap.has(key)) timelineMap.set(key, (timelineMap.get(key) ?? 0) + 1);
    });
    const timeline = Array.from(timelineMap.entries()).map(([key, value]) => ({
      month: new Date(`${key}-01`).toLocaleDateString("fr-FR", { month: "short", year: "2-digit" }),
      leads: value,
    }));

    // Par métier
    const byServiceMap = new Map<string, number>();
    leads.forEach((l) => {
      if (!l.project_type) return;
      const name = SERVICES.find((s) => s.slug === l.project_type)?.name ?? l.project_type;
      byServiceMap.set(name, (byServiceMap.get(name) ?? 0) + 1);
    });
    const byService = Array.from(byServiceMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    // Par département
    const byDeptMap = new Map<string, number>();
    leads.forEach((l) => {
      const dept = l.department ?? "Non renseigné";
      byDeptMap.set(dept, (byDeptMap.get(dept) ?? 0) + 1);
    });
    const byDept = Array.from(byDeptMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    return {
      total,
      thisMonth,
      activeArtisans,
      totalBudget,
      conversion,
      timeline,
      byService,
      byDept,
    };
  }, [leads, artisans]);

  const recentLeads = leads.slice(0, 6);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Tableau de bord</h1>
        <p className="text-sm text-slate-500">
          Vue d&apos;ensemble de la génération de leads
        </p>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Leads total" value={stats.total} icon={Users} />
        <KpiCard label="Ce mois" value={stats.thisMonth} icon={TrendingUp} accent="bg-blue-100 text-blue-700" />
        <KpiCard label="Artisans actifs" value={stats.activeArtisans} icon={HardHat} accent="bg-amber-100 text-amber-700" />
        <KpiCard label="Montant estimé" value={formatEUR(stats.totalBudget)} icon={Euro} accent="bg-violet-100 text-violet-700" />
        <KpiCard label="Conversion" value={`${stats.conversion}%`} icon={TrendingUp} accent="bg-emerald-100 text-emerald-700" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h2 className="font-bold text-slate-900">Leads sur 6 mois</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="leads" fill="#047857" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="font-bold text-slate-900">Leads par métier</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.byService}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={false}
                >
                  {stats.byService.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-1">
          <h2 className="font-bold text-slate-900">Leads par département</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.byDept} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leads récents */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Derniers leads</h2>
            <Link
              href="/crm/admin/leads"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700"
            >
              Tout voir <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                  <th className="py-2 pr-3">Contact</th>
                  <th className="py-2 pr-3">Projet</th>
                  <th className="py-2 pr-3">Ville</th>
                  <th className="py-2 pr-3">Statut</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {leadsLoading ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      Chargement…
                    </td>
                  </tr>
                ) : recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      Aucun lead pour le moment.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((l) => {
                    const service = SERVICES.find((s) => s.slug === l.project_type);
                    const status = LEAD_STATUS[l.status];
                    return (
                      <tr key={l.id} className="border-b border-slate-100">
                        <td className="py-2.5 pr-3">
                          <span className="font-medium text-slate-900">
                            {l.first_name} {l.last_name}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 text-slate-600">
                          {service?.name ?? l.project_type ?? "—"}
                        </td>
                        <td className="py-2.5 pr-3 text-slate-600">{l.city ?? "—"}</td>
                        <td className="py-2.5 pr-3">
                          <Badge className={status.className}>{status.label}</Badge>
                        </td>
                        <td className="py-2.5 text-slate-500">{formatDate(l.created_at)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
