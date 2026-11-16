export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Notre maison de 1972 est passée du diagnostic G au C. Facture de chauffage divisée par deux et un confort retrouvé dans chaque pièce. Le dossier MaPrimeRénov' a été géré de bout en bout, sans un seul aller-retour de notre part.",
    author: "Franck & Sylvie P.",
    location: "Beaune (21)",
    rating: 5,
  },
  {
    quote:
      "Après deux artisans qui ne se sont jamais déplacés, RenovAllo m'a mis en relation avec un plombier en 48h. Devis détaillé sous 72h, chantier livré en trois semaines et un carrelage impeccable. Enfin du sérieux.",
    author: "Corinne T.",
    location: "Montbéliard (25)",
    rating: 5,
  },
  {
    quote:
      "Extension de 28 m² en ossature bois : permis de construire, choix des artisans et budget tenu à l'euro près. Nous avons gagné un vrai séjour baigné de lumière, ouvert sur le jardin.",
    author: "David R.",
    location: "Chalon-sur-Saône (71)",
    rating: 5,
  },
  {
    quote:
      "Rénovation intégrale de notre maison de 1968. Un seul contact a coordonné maçon, électricien et plombier. Le budget annoncé au départ n'a pas bougé d'un euro.",
    author: "La famille Mercier",
    location: "Auxerre (89)",
    rating: 5,
  },
  {
    quote:
      "Fuite en toiture découverte en plein hiver. Un couvreur est intervenu en 72h, le diagnostic était précis et le tarif annoncé a été respecté. La zinguerie a été refaite dans la foulée.",
    author: "Michèle B.",
    location: "Pontarlier (25)",
    rating: 5,
  },
  {
    quote:
      "Ma cuisine de 6 m² était inexploitable. Conception 3D, meubles sur mesure et raccordements coordonnés en deux semaines. Le résultat dépasse tout ce que j'imaginais.",
    author: "Antoine L.",
    location: "Dijon (21)",
    rating: 5,
  },
];

export interface Realisation {
  slug: string;
  title: string;
  city: string;
  serviceSlug: string;
  amount: string;
  surface: string;
  description: string;
}

export const REALISATIONS: Realisation[] = [
  {
    slug: "renovation-energetique-maison-beaune",
    title: "Rénovation énergétique d'une maison de 1972",
    city: "Beaune",
    serviceSlug: "renovation-energetique",
    amount: "41 500 €",
    surface: "115 m²",
    description:
      "Isolation des combles et des murs, pompe à chaleur air/eau, passage du DPE de G à C.",
  },
  {
    slug: "extension-ossature-bois-chalon",
    title: "Extension ossature bois de 28 m²",
    city: "Chalon-sur-Saône",
    serviceSlug: "extension-agrandissement",
    amount: "47 000 €",
    surface: "28 m²",
    description:
      "Création d'un séjour lumineux ouvert sur le jardin, avec baies vitrées et terrasse.",
  },
  {
    slug: "salle-de-bain-montbeliard",
    title: "Rénovation d'une salle de bain familiale",
    city: "Montbéliard",
    serviceSlug: "salle-de-bain",
    amount: "11 500 €",
    surface: "7 m²",
    description:
      "Douche à l'italienne, meuble suspendu et carrelage grand format.",
  },
  {
    slug: "amenagement-combles-auxerre",
    title: "Aménagement de combles en deux chambres",
    city: "Auxerre",
    serviceSlug: "amenagement-combles",
    amount: "33 000 €",
    surface: "42 m²",
    description:
      "Isolation, deux fenêtres de toit, deux chambres et un coin bureau.",
  },
  {
    slug: "toiture-belfort",
    title: "Réfection de toiture en tuiles plates",
    city: "Belfort",
    serviceSlug: "toiture-couverture",
    amount: "19 500 €",
    surface: "130 m²",
    description:
      "Dépose, pose de tuiles neuves, zinguerie et isolation sous rampant.",
  },
  {
    slug: "cuisine-macon",
    title: "Création d'une cuisine sur mesure",
    city: "Mâcon",
    serviceSlug: "cuisine",
    amount: "16 000 €",
    surface: "12 m²",
    description:
      "Cuisine en U sur mesure, plan de travail quartz et éclairage LED.",
  },
];
