import type { LeadStatus, ChantierStatus, DevisStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const LEAD_STATUS: Record<
  LeadStatus,
  { label: string; className: string }
> = {
  nouveau: { label: "Nouveau", className: "bg-blue-100 text-blue-700" },
  contacte: { label: "Contacté", className: "bg-amber-100 text-amber-700" },
  qualifie: { label: "Qualifié", className: "bg-violet-100 text-violet-700" },
  devis_envoye: { label: "Devis envoyé", className: "bg-indigo-100 text-indigo-700" },
  signe: { label: "Signé", className: "bg-emerald-100 text-emerald-700" },
  perdu: { label: "Perdu", className: "bg-slate-200 text-slate-600" },
};

export const CHANTIER_STATUS: Record<
  ChantierStatus,
  { label: string; className: string }
> = {
  prospect: { label: "Prospect", className: "bg-slate-200 text-slate-700" },
  devis: { label: "Devis", className: "bg-amber-100 text-amber-700" },
  planifie: { label: "Planifié", className: "bg-blue-100 text-blue-700" },
  en_cours: { label: "En cours", className: "bg-indigo-100 text-indigo-700" },
  termine: { label: "Terminé", className: "bg-emerald-100 text-emerald-700" },
  facture: { label: "Facturé", className: "bg-green-100 text-green-700" },
};

export const DEVIS_STATUS: Record<
  DevisStatus,
  { label: string; className: string }
> = {
  brouillon: { label: "Brouillon", className: "bg-slate-200 text-slate-700" },
  envoye: { label: "Envoyé", className: "bg-blue-100 text-blue-700" },
  accepte: { label: "Accepté", className: "bg-emerald-100 text-emerald-700" },
  refuse: { label: "Refusé", className: "bg-red-100 text-red-700" },
};

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  accent = "text-emerald-700 bg-emerald-100",
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  accent?: string;
}) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-lg", accent)}>
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
