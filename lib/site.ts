export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.renovallo.fr";

export const SITE_NAME = "RenovAllo";

export const SITE_TAGLINE =
  "Courtier en travaux & maître d'œuvre en Bourgogne-Franche-Comté";

export const SITE_DESCRIPTION =
  "RenovAllo, votre courtier en travaux tous corps de métier en Bourgogne-Franche-Comté. Chiffrage gratuit sous 72h, artisans qualifiés sélectionnés et suivi de chantier de A à Z. Un prix juste et un chantier livré sans stress.";

// Pas de numéro de téléphone : contact uniquement par formulaire et email.
export const CONTACT_EMAIL = "contact@renovallo.fr";

export const REGION_NAME = "Bourgogne-Franche-Comté";

export const NAV_LINKS = [
  { href: "/services", label: "Nos métiers" },
  { href: "/villes", label: "Nos secteurs" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/blog", label: "Conseils & guides" },
  { href: "/demande-devis", label: "Demander un devis" },
];

export const SOCIAL_LINKS: { href: string; label: string }[] = [];

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.jpg`;
