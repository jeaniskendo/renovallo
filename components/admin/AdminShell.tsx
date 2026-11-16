"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  HardHat,
  Map,
  LogOut,
  Hammer,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/crm/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/crm/admin/leads", label: "Leads", icon: Users },
  { href: "/crm/admin/artisans", label: "Artisans", icon: HardHat },
  { href: "/crm/admin/map", label: "Carte France", icon: Map },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/crm/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white">
            <Hammer className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-extrabold text-slate-900">
            RENOV<span className="text-emerald-700">ALLO</span>
          </span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile nav */}
        <div className="flex h-14 items-center gap-2 border-b border-slate-200 bg-white px-4 md:hidden">
          <span className="font-extrabold text-slate-900">
            RENOV<span className="text-emerald-700">ALLO</span>
          </span>
          <nav className="ml-auto flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg p-2",
                  pathname.startsWith(item.href)
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-500"
                )}
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="rounded-lg p-2 text-slate-500"
              aria-label="Déconnexion"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
