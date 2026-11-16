# RENOVALLO

Site de génération de leads en rénovation (tous corps de métier) pour la **Bourgogne-Franche-Comté**, conçu pour la conversion et le SEO, avec un **CRM** de suivi des leads et un **espace artisan partenaire**.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS 4**
- **Supabase** (Postgres + Auth + Realtime + RLS) pour la base de données, l'authentification et le temps réel
- **Recharts** (statistiques) et **Leaflet / react-leaflet** (carte de France)
- Hébergement : **Vercel**

## Démarrage rapide

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Créer le projet Supabase** (https://supabase.com) puis exécuter, dans le SQL Editor, les scripts :
   - `supabase/schema.sql` → tables, RLS, fonctions et triggers
   - `supabase/seed.sql` → données de démonstration (après avoir créé les utilisateurs, voir ci-dessous)

3. **Configurer les variables d'environnement**

   Copier `.env.example` vers `.env.local` et renseigner :

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://XXXX.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXT_PUBLIC_SITE_URL=https://www.renovallo.fr
   ```

4. **Créer les comptes** (Supabase → Authentication → Users)

   | Email                    | Mot de passe | Rôle    | UUID                                    |
   | ------------------------ | ------------ | ------- | --------------------------------------- |
   | admin@renovallo.fr       | (au choix)   | admin   | `00000000-0000-0000-0000-000000000001` |
   | artisan1@renovallo.fr    | (au choix)   | artisan | `00000000-0000-0000-0000-000000000002` |
   | artisan2@renovallo.fr    | (au choix)   | artisan | `00000000-0000-0000-0000-000000000003` |
   | artisan3@renovallo.fr    | (au choix)   | artisan | `00000000-0000-0000-0000-000000000004` |

   > Les UUID sont ceux utilisés par `supabase/seed.sql`. Pour créer un utilisateur avec un UUID précis, utilisez l'API admin (`auth.admin.createUser`) ou la CLI Supabase. Le profil est créé automatiquement par le trigger `on_auth_user_created`.

5. **Lancer le développement**

   ```bash
   npm run dev
   ```

## Accès

- **Site public** : `/` (landing conversion + SEO)
- **CRM administrateur** : `/crm/login` puis `/crm/admin` (tableau de bord, stats, carte France, leads, artisans, quotas)
- **Espace artisan** : `/artisan/login` puis `/artisan` (leads, chantiers, devis, quota)

## Structure

```
app/
  (site)/            Site public (header/footer, pages villes/métiers/blog…)
  (crm)/crm/         CRM admin + login
  (artisan)/artisan/ Espace artisan + login
  api/               Route handlers (leads, auth)
  sitemap.ts         Sitemap dynamique
  robots.ts          Robots.txt
components/
  admin/ artisant/ dashboard/ map/  Composants des espaces et du CRM
lib/
  data/              Données SEO (19 métiers, 70 villes BFC, articles, avis)
  supabase/          Clients Supabase (browser / server / admin)
  database.types.ts  Types de la base
supabase/
  schema.sql         Schéma complet + RLS + trigger + fonctions
  seed.sql           Données de démonstration
```

## SEO

- Sitemap XML dynamique (`/sitemap.xml`) : pages statiques + 19 métiers + 70 villes + 8 articles
- Données structurées JSON-LD : `Organization`, `ProfessionalService`, `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`
- Pages villes (maillage local) + footer avec l'ensemble des communes de BFC
- Métadonnées `title` / `description` / `canonical` optimisées par page

## Règles métier

- Un **lead** créé depuis le site est auto-assigné à l'artisan le plus proche (même métier, quota disponible).
- Chaque artisan a un **quota mensuel** de leads (gérable dans le CRM → Artisans).
- Le CRM remonte : volume de leads, montants, services, départements, conversion, et une **carte de France** des partenaires (filtres période + métier).
