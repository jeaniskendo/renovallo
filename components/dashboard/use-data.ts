"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/database.types";
import type { Lead, Profile, Quota, Chantier, Devis } from "@/lib/types";

export function useLeads() {
  const [data, setData] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  async function load() {
    const supabase = createClient();
    const res = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!mounted.current) return;
    if (res.error) setError(res.error.message);
    else setData(res.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    mounted.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- setState occurs after an async `await`
    load();
    const supabase = createClient();
    const channel = supabase
      .channel("leads-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        () => load()
      )
      .subscribe();
    return () => {
      mounted.current = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading, error, refresh: load };
}

export function useArtisans() {
  const [data, setData] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  async function load() {
    const supabase = createClient();
    const res = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "artisan")
      .order("created_at", { ascending: false });
    if (!mounted.current) return;
    setData(res.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    mounted.current = true;
    load();
    const supabase = createClient();
    const channel = supabase
      .channel("artisans-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => load()
      )
      .subscribe();
    return () => {
      mounted.current = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading, refresh: load };
}

export function useCurrentProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    (async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!mounted.current) return;
      if (user) {
        setUserId(user.id);
        const res = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (mounted.current) setProfile(res.data ?? null);
      }
      if (mounted.current) setLoading(false);
    })();
    return () => {
      mounted.current = false;
    };
  }, []);

  return { profile, userId, loading };
}

function useScopedTable<T>(table: keyof Database["public"]["Tables"]) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  async function load() {
    const supabase = createClient();
    const res = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: false });
    if (!mounted.current) return;
    setData((res.data as T[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    mounted.current = true;
    load();
    const supabase = createClient();
    const channel = supabase
      .channel(`${String(table)}-changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: String(table) },
        () => load()
      )
      .subscribe();
    return () => {
      mounted.current = false;
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return { data, loading, refresh: load };
}

export function useChantiers() {
  return useScopedTable<Chantier>("chantiers");
}

export function useDevis() {
  return useScopedTable<Devis>("devis");
}

export function useQuotas() {
  const [data, setData] = useState<Quota[]>([]);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  async function load() {
    const supabase = createClient();
    const res = await supabase.from("quotas").select("*");
    if (!mounted.current) return;
    setData(res.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, []);

  return { data, loading, refresh: load };
}
