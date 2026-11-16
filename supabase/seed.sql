-- ============================================================================
-- RENOVALLO — Données de démonstration (seed)
-- AVANT d'exécuter : créer les utilisateurs auth correspondants (mêmes UUID)
--   - Dashboard Supabase > Authentication > Users > Add user
--   - OU via CLI : supabase functions / admin API
-- UUID réservés :
--   00000000-0000-0000-0000-000000000001  admin@renovallo.fr   (ADMIN)
--   00000000-0000-0000-0000-000000000002  artisan1@renovallo.fr (artisan)
--   00000000-0000-0000-0000-000000000003  artisan2@renovallo.fr (artisan)
--   00000000-0000-0000-0000-000000000004  artisan3@renovallo.fr (artisan)
-- ============================================================================

-- Profils
insert into public.profiles (id, role, full_name, email, company_name, trade, trades, phone, siret, city, postal_code, department, lat, lng, radius_km, quota_monthly, active)
values
  ('00000000-0000-0000-0000-000000000001', 'admin', 'Direction RenovAllo', 'admin@renovallo.fr', 'RenovAllo', 'courtier', '{courtier}', null, null, 'Dijon', '21000', 'Côte-d''Or', 47.322, 5.0415, 200, 0, true),
  ('00000000-0000-0000-0000-000000000002', 'artisan', 'Paul Moreau', 'artisan1@renovallo.fr', 'PM Rénovation', 'renovation-globale', '{renovation-globale, maconnerie, toiture-couverture}', null, null, 'Dijon', '21000', 'Côte-d''Or', 47.322, 5.0415, 40, 10, true),
  ('00000000-0000-0000-0000-000000000003', 'artisan', 'Sophie Lemaire', 'artisan2@renovallo.fr', 'Atelier Lemaire', 'salle-de-bain', '{salle-de-bain, plomberie, peinture-sols}', null, null, 'Besançon', '25000', 'Doubs', 47.2378, 6.0241, 35, 8, true),
  ('00000000-0000-0000-0000-000000000004', 'artisan', 'Karim Benali', 'artisan3@renovallo.fr', 'BFC Énergie', 'renovation-energetique', '{renovation-energetique, chauffage-climatisation, menuiserie}', null, null, 'Chalon-sur-Saône', '71100', 'Saône-et-Loire', 46.7808, 4.8539, 30, 12, true)
on conflict (id) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  email = excluded.email,
  company_name = excluded.company_name,
  trade = excluded.trade,
  trades = excluded.trades,
  city = excluded.city,
  postal_code = excluded.postal_code,
  department = excluded.department,
  lat = excluded.lat,
  lng = excluded.lng,
  radius_km = excluded.radius_km,
  quota_monthly = excluded.quota_monthly,
  active = excluded.active;

-- Quotas du mois courant
insert into public.quotas (artisan_id, month, max_leads, used_leads)
values
  ('00000000-0000-0000-0000-000000000002', date_trunc('month', now())::date, 10, 2),
  ('00000000-0000-0000-0000-000000000003', date_trunc('month', now())::date, 8, 1),
  ('00000000-0000-0000-0000-000000000004', date_trunc('month', now())::date, 12, 3)
on conflict (artisan_id, month) do nothing;

-- Leads de démonstration
insert into public.leads (first_name, last_name, email, phone, project_type, property_type, description, budget_min, budget_max, postal_code, city, department, lat, lng, status, source, page_url, assigned_artisan, assigned_at)
values
  ('Marc', 'Perrin', 'marc.perrin@example.fr', '06 12 34 56 78', 'renovation-energetique', 'maison', 'Isolation des combles et remplacement de la chaudière fioul par une pompe à chaleur.', 25000, 40000, '21000', 'Dijon', 'Côte-d''Or', 47.322, 5.0415, 'devis_envoye', 'site', '/villes/dijon', '00000000-0000-0000-0000-000000000002', now() - interval '2 days'),
  ('Claire', 'Roussel', 'claire.roussel@example.fr', '07 98 76 54 32', 'salle-de-bain', 'appartement', 'Rénovation complète de la salle de bain, douche à l''italienne souhaitée.', 8000, 12000, '25000', 'Besançon', 'Doubs', 47.2378, 6.0241, 'contacte', 'site', '/services/salle-de-bain', '00000000-0000-0000-0000-000000000003', now() - interval '1 day'),
  ('Julien', 'Giraud', 'julien.giraud@example.fr', '06 44 55 66 77', 'extension-agrandissement', 'maison', 'Extension de 30 m² en ossature bois pour un séjour ouvert sur le jardin.', 45000, 65000, '71100', 'Chalon-sur-Saône', 'Saône-et-Loire', 46.7808, 4.8539, 'qualifie', 'site', '/services/extension-agrandissement', '00000000-0000-0000-0000-000000000004', now() - interval '5 days'),
  ('Nadia', 'Haddad', 'nadia.haddad@example.fr', null, 'renovation-globale', 'maison', 'Rénovation complète d''une maison des années 70, 120 m².', 100000, 150000, '89000', 'Auxerre', 'Yonne', 47.7976, 3.5667, 'nouveau', 'site', '/', null, null),
  ('Pierre', 'Lemoine', 'pierre.lemoine@example.fr', '06 10 20 30 40', 'toiture-couverture', 'maison', 'Fuite au niveau de la toiture, tuiles à vérifier, probable réfection partielle.', 5000, 12000, '90000', 'Belfort', 'Territoire de Belfort', 47.6397, 6.8638, 'nouveau', 'site', '/services/toiture-couverture', null, null),
  ('Emma', 'Faure', 'emma.faure@example.fr', '07 12 13 14 15', 'amenagement-combles', 'maison', 'Aménagement de combles perdus en suite parentale (environ 35 m²).', 25000, 40000, '58000', 'Nevers', 'Nièvre', 46.993, 3.157, 'nouveau', 'site', '/services/amenagement-combles', null, null)
on conflict do nothing;
