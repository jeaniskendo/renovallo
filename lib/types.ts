export type UserRole = "admin" | "artisan";

export type Profile = {
  id: string;
  role: UserRole;
  full_name: string | null;
  email: string | null;
  company_name: string | null;
  trade: string | null;
  trades: string[] | null;
  phone: string | null;
  siret: string | null;
  city: string | null;
  postal_code: string | null;
  department: string | null;
  lat: number | null;
  lng: number | null;
  radius_km: number | null;
  quota_monthly: number | null;
  active: boolean | null;
  created_at: string | null;
};

export type LeadStatus =
  | "nouveau"
  | "contacte"
  | "qualifie"
  | "devis_envoye"
  | "signe"
  | "perdu";

export type Lead = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  project_type: string | null;
  property_type: string | null;
  description: string | null;
  budget_min: number | null;
  budget_max: number | null;
  address: string | null;
  postal_code: string | null;
  city: string | null;
  department: string | null;
  lat: number | null;
  lng: number | null;
  status: LeadStatus;
  source: string | null;
  page_url: string | null;
  photos: string[] | null;
  assigned_artisan: string | null;
  assigned_at: string | null;
  created_at: string | null;
};

export type Quota = {
  id: string;
  artisan_id: string;
  month: string;
  max_leads: number;
  used_leads: number;
};

export type ChantierStatus =
  | "prospect"
  | "devis"
  | "planifie"
  | "en_cours"
  | "termine"
  | "facture";

export type Chantier = {
  id: string;
  artisan_id: string;
  lead_id: string | null;
  title: string | null;
  client_name: string | null;
  status: ChantierStatus;
  amount: number | null;
  address: string | null;
  city: string | null;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  created_at: string | null;
};

export type DevisStatus = "brouillon" | "envoye" | "accepte" | "refuse";

export type Devis = {
  id: string;
  artisan_id: string;
  lead_id: string | null;
  chantier_id: string | null;
  reference: string | null;
  amount: number | null;
  status: DevisStatus;
  valid_until: string | null;
  created_at: string | null;
};
