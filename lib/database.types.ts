import type {
  Chantier,
  Devis,
  Lead,
  Profile,
  Quota,
} from "@/lib/types";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      leads: {
        Row: Lead;
        Insert: Partial<Lead>;
        Update: Partial<Lead>;
        Relationships: [];
      };
      quotas: {
        Row: Quota;
        Insert: Partial<Quota>;
        Update: Partial<Quota>;
        Relationships: [];
      };
      chantiers: {
        Row: Chantier;
        Insert: Partial<Chantier>;
        Update: Partial<Chantier>;
        Relationships: [];
      };
      devis: {
        Row: Devis;
        Insert: Partial<Devis>;
        Update: Partial<Devis>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      assign_lead_to_artisan: {
        Args: { p_lead_id: string; p_artisan_id: string };
        Returns: Json;
      };
      release_lead: {
        Args: { p_lead_id: string };
        Returns: Json;
      };
      create_lead: {
        Args: {
          p_first_name: string | null;
          p_last_name: string | null;
          p_email: string;
          p_phone: string | null;
          p_project_type: string | null;
          p_property_type: string | null;
          p_description: string | null;
          p_budget_min: number | null;
          p_budget_max: number | null;
          p_postal_code: string | null;
          p_city: string | null;
          p_department: string | null;
          p_lat: number | null;
          p_lng: number | null;
          p_page_url: string | null;
          p_photos?: string[] | null;
        };
        Returns: string;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
