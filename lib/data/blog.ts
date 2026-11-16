export interface BlogBlock {
  heading?: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  serviceSlug?: string;
  date: string;
  readTime: string;
  excerpt: string;
  keywords: string[];
  content: BlogBlock[];
  faq: { q: string; a: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "prix-renovation-maison-m2",
    title: "Prix d'une rénovation de maison au m² en Bourgogne-Franche-Comté",
    metaTitle:
      "Prix rénovation maison au m² en 2026 | Guide Bourgogne-Franche-Comté",
    metaDescription:
      "Combien coûte une rénovation au m² en Bourgogne-Franche-Comté ? Découvrez les fourchettes de prix par type de travaux et nos conseils pour budgéter sans mauvaise surprise.",
    category: "Budgets & prix",
    serviceSlug: "renovation-globale",
    date: "2026-10-14",
    readTime: "8 min",
    excerpt:
      "De 800 € à 2 000 € du m² selon l'état du bien : voici le vrai coût d'une rénovation en Bourgogne-Franche-Comté, poste par poste.",
    keywords: ["prix rénovation m2", "coût rénovation maison", "budget travaux"],
    content: [
      {
        body: [
          "Le prix d'une rénovation au m² est la première question que se posent les propriétaires. La réponse honnête : cela dépend de l'état du bien, de l'ampleur des travaux et du niveau de finition visé. Ce guide vous donne des fourchettes réalistes, issues de chantiers réels pilotés en Bourgogne-Franche-Comté.",
        ],
      },
      {
        heading: "Les fourchettes de prix par niveau de rénovation",
        body: [
          "Rénovation légère (rafraîchissement, peinture, sols) : 300 € à 600 € du m². Rénovation moyenne (électricité, plomberie, cuisine, salle de bain) : 800 € à 1 400 € du m². Rénovation lourde (restructuration, isolation, reprise du gros œuvre) : 1 400 € à 2 000 € du m².",
        ],
      },
      {
        heading: "Le détail poste par poste",
        body: [
          "Isolation des combles : 20 € à 50 €/m². Électricité : 80 € à 120 €/m². Plomberie : 60 € à 100 €/m². Cuisine équipée : 5 000 € à 15 000 €. Salle de bain : 6 000 € à 12 000 €. Revêtements de sol : 30 € à 90 €/m².",
        ],
      },
      {
        heading: "Comment éviter les dépassements de budget",
        body: [
          "La principale cause de dépassement est le chiffrage incomplet. Un courtier en travaux comme RenovAllo consolide l'ensemble des devis, identifie les oublis et sécurise le budget avec une marge pour imprévus clairement affichée.",
        ],
      },
    ],
    faq: [
      {
        q: "Quel budget prévoir pour rénover 100 m² ?",
        a: "Comptez entre 80 000 € et 200 000 € selon l'état du bien et le niveau de rénovation. Nous établissons un chiffrage consolidé gratuit sous 72h.",
      },
    ],
  },
  {
    slug: "aides-renovation-energetique-2026",
    title: "Aides rénovation énergétique 2026 : MaPrimeRénov', CEE, éco-PTZ",
    metaTitle:
      "Aides rénovation énergétique 2026 | MaPrimeRénov' & CEE en BFC",
    metaDescription:
      "MaPrimeRénov', Certificats d'Économies d'Énergie, éco-PTZ : découvrez toutes les aides pour financer votre rénovation énergétique en Bourgogne-Franche-Comté.",
    category: "Aides & financement",
    serviceSlug: "renovation-energetique",
    date: "2026-09-28",
    readTime: "7 min",
    excerpt:
      "Isolation, pompe à chaleur, menuiseries : cumulez les aides et réduisez fortement le reste à charge de votre rénovation énergétique.",
    keywords: ["MaPrimeRénov'", "aides rénovation", "CEE", "éco-PTZ"],
    content: [
      {
        body: [
          "Rénover son logement pour gagner en confort et réduire sa facture, c'est bien. Le faire en mobilisant toutes les aides disponibles, c'est mieux. Voici le panorama des aides 2026 en Bourgogne-Franche-Comté.",
        ],
      },
      {
        heading: "MaPrimeRénov' : le dispositif central",
        body: [
          "MaPrimeRénov' finance l'isolation, le chauffage performant et la ventilation. Son montant dépend de vos revenus et de l'ampleur des travaux. Les ménages modestes bénéficient des taux les plus élevés, via le parcours accompagné.",
        ],
      },
      {
        heading: "Les CEE et l'éco-PTZ",
        body: [
          "Les Certificats d'Économies d'Énergie sont versés par les fournisseurs d'énergie et se cumulent avec MaPrimeRénov'. L'éco-prêt à taux zéro permet de financer le reste à charge sans intérêts.",
        ],
      },
      {
        heading: "L'accompagnement RenovAllo",
        body: [
          "Nous identifions les travaux éligibles, estimons le montant des aides et montons les dossiers. Objectif : maximiser le financement de votre projet dès le chiffrage.",
        ],
      },
    ],
    faq: [
      {
        q: "Puis-je cumuler MaPrimeRénov' et les CEE ?",
        a: "Oui, ces dispositifs sont cumulables. Nous vérifions votre éligibilité et optimisons le montage financier de votre dossier.",
      },
    ],
  },
  {
    slug: "comment-choisir-courtier-en-travaux",
    title: "Comment choisir son courtier en travaux en Bourgogne-Franche-Comté",
    metaTitle:
      "Choisir un courtier en travaux | Guide complet Bourgogne-Franche-Comté",
    metaDescription:
      "Quel est le rôle d'un courtier en travaux et comment choisir le bon en Bourgogne-Franche-Comté ? Nos critères pour éviter les arnaques et sécuriser votre chantier.",
    category: "Guides",
    serviceSlug: "renovation-globale",
    date: "2026-09-12",
    readTime: "6 min",
    excerpt:
      "Un courtier en travaux fiable vous fait gagner du temps et de l'argent. Voici les 7 critères pour le choisir sans se tromper.",
    keywords: ["courtier en travaux", "choisir courtier", "maître d'œuvre"],
    content: [
      {
        body: [
          "Faire appel à un courtier en travaux, c'est déléguer la recherche d'artisans, la comparaison des devis et le suivi de chantier à un professionnel. Mais tous ne se valent pas. Voici comment sélectionner le bon interlocuteur.",
        ],
      },
      {
        heading: "Les 7 critères décisifs",
        body: [
          "1. Un chiffrage gratuit et détaillé sous 72h. 2. Des artisans qualifiés, assurés et vérifiés. 3. Un contact unique et réactif. 4. Des références et avis clients vérifiables. 5. La transparence sur les honoraires. 6. Un accompagnement aux aides financières. 7. Un prix juste et négocié pour vous.",
        ],
      },
      {
        heading: "Pourquoi choisir un acteur local",
        body: [
          "Un courtier implanté en Bourgogne-Franche-Comté connaît les artisans locaux, les spécificités du bâti régional et les règles d'urbanisme. C'est un gage de réactivité et de fiabilité.",
        ],
      },
    ],
    faq: [
      {
        q: "Combien coûte un courtier en travaux ?",
        a: "Le courtier se rémunère généralement en pourcentage du chantier ou via des honoraires fixes. RenovAllo affiche une tarification claire dès le premier échange, sans frais cachés.",
      },
    ],
  },
  {
    slug: "prix-extension-maison",
    title: "Prix d'une extension de maison en Bourgogne-Franche-Comté",
    metaTitle:
      "Prix extension maison 2026 | Ossature bois ou maçonnerie en BFC",
    metaDescription:
      "Extension ossature bois ou maçonnerie : prix au m², permis de construire et délais en Bourgogne-Franche-Comté. Chiffrage gratuit sous 72h.",
    category: "Budgets & prix",
    serviceSlug: "extension-agrandissement",
    date: "2026-08-30",
    readTime: "6 min",
    excerpt:
      "Entre 1 200 € et 2 500 € du m² : combien coûte vraiment une extension de maison, selon la technique choisie.",
    keywords: ["prix extension maison", "extension ossature bois", "surélévation"],
    content: [
      {
        body: [
          "Agrandir sa maison est souvent plus rentable que déménager. Mais le budget varie fortement selon la technique : ossature bois ou maçonnerie. Voici les ordres de grandeur à connaître avant de vous lancer.",
        ],
      },
      {
        heading: "Extension en maçonnerie",
        body: [
          "La maçonnerie traditionnelle coûte 1 500 € à 2 500 € du m². Elle offre une excellente inertie thermique et s'intègre bien au bâti existant.",
        ],
      },
      {
        heading: "Extension en ossature bois",
        body: [
          "L'ossature bois coûte 1 200 € à 1 800 € du m² et permet des délais plus courts. Elle est plébiscitée pour son bilan environnemental et ses performances d'isolation.",
        ],
      },
      {
        heading: "Les démarches administratives",
        body: [
          "Au-delà de 20 m² d'emprise au sol, un permis de construire est requis. Nous gérons l'étude, le dépôt et le suivi de l'instruction.",
        ],
      },
    ],
    faq: [
      {
        q: "Extension bois ou maçonnerie : que choisir ?",
        a: "Le bois est plus rapide et performant en isolation, la maçonnerie plus massive et inerte. Nous vous conseillons selon votre projet, votre budget et votre terrain.",
      },
    ],
  },
  {
    slug: "renovation-salle-de-bain-prix",
    title: "Rénovation de salle de bain : prix, délais et étapes",
    metaTitle:
      "Prix rénovation salle de bain 2026 | Guide Bourgogne-Franche-Comté",
    metaDescription:
      "Combien coûte une rénovation de salle de bain en Bourgogne-Franche-Comté ? Prix, délais et étapes clés pour réussir votre projet sans stress.",
    category: "Budgets & prix",
    serviceSlug: "salle-de-bain",
    date: "2026-08-18",
    readTime: "5 min",
    excerpt:
      "De 6 000 € à 20 000 € selon l'ampleur : voici comment budgéter et planifier la rénovation de votre salle de bain.",
    keywords: ["rénovation salle de bain prix", "douche italienne", "salle de bain"],
    content: [
      {
        body: [
          "La salle de bain est la pièce la plus technique de la maison. Une rénovation réussie repose sur une coordination parfaite entre plomberie, électricité et finitions.",
        ],
      },
      {
        heading: "Les budgets par type de projet",
        body: [
          "Rafraîchissement (peinture, robinetterie, meubles) : 1 500 € à 4 000 €. Rénovation complète : 6 000 € à 12 000 €. Création de salle de bain avec gros œuvre : 10 000 € à 20 000 €.",
        ],
      },
      {
        heading: "Les étapes clés",
        body: [
          "Dépose, préparation des supports, plomberie, électricité (volumes de sécurité), étanchéité, revêtements, pose des équipements, finitions. Comptez 2 à 4 semaines de travaux.",
        ],
      },
    ],
    faq: [
      {
        q: "Combien de temps dure une rénovation de salle de bain ?",
        a: "Comptez 2 à 4 semaines selon l'ampleur des travaux et la disponibilité des artisans sélectionnés.",
      },
    ],
  },
  {
    slug: "pompe-a-chaleur-prix-rentabilite",
    title: "Pompe à chaleur : prix, aides et rentabilité en Bourgogne-Franche-Comté",
    metaTitle:
      "Pompe à chaleur prix & rentabilité 2026 | Guide BFC",
    metaDescription:
      "Prix d'une pompe à chaleur air/eau ou air/air, aides disponibles et temps de retour sur investissement en Bourgogne-Franche-Comté.",
    category: "Énergie",
    serviceSlug: "chauffage-climatisation",
    date: "2026-07-25",
    readTime: "6 min",
    excerpt:
      "Une PAC bien dimensionnée peut diviser votre facture de chauffage par deux. Voici les prix, les aides et le vrai retour sur investissement.",
    keywords: ["pompe à chaleur prix", "PAC air/eau", "chauffage"],
    content: [
      {
        body: [
          "La pompe à chaleur s'impose comme la solution de chauffage la plus performante pour remplacer une chaudière fioul ou gaz. Encore faut-il bien la dimensionner et bien l'installer.",
        ],
      },
      {
        heading: "Les prix constatés",
        body: [
          "Pompe à chaleur air/air : 6 000 € à 10 000 €. Pompe à chaleur air/eau : 8 000 € à 15 000 € posée. Les aides (MaPrimeRénov', CEE) peuvent réduire la facture de plusieurs milliers d'euros.",
        ],
      },
      {
        heading: "Rentabilité et confort",
        body: [
          "Une PAC bien dimensionnée restitue 3 à 4 kWh de chaleur pour 1 kWh d'électricité consommé. Sur un logement correctement isolé, le retour sur investissement s'observe en 5 à 10 ans.",
        ],
      },
    ],
    faq: [
      {
        q: "Une pompe à chaleur est-elle adaptée à ma maison ?",
        a: "Elle est idéale sur un logement bien isolé équipé d'un chauffage central basse température. Notre étude thermique gratuite confirme la pertinence du projet.",
      },
    ],
  },
  {
    slug: "amenagement-combles-prix-faisabilite",
    title: "Aménagement de combles : prix, faisabilité et réglementation",
    metaTitle:
      "Aménagement combles prix & faisabilité 2026 | Bourgogne-Franche-Comté",
    metaDescription:
      "Combien coûte l'aménagement de combles ? Faisabilité, hauteur sous plafond, fenêtres de toit et démarches. Guide complet Bourgogne-Franche-Comté.",
    category: "Guides",
    serviceSlug: "amenagement-combles",
    date: "2026-07-08",
    readTime: "6 min",
    excerpt:
      "20 000 € à 45 000 € pour 30 à 40 m² : découvrez si vos combles sont aménageables et combien cela coûte vraiment.",
    keywords: ["aménagement combles prix", "combles aménageables", "fenêtre toit"],
    content: [
      {
        body: [
          "Aménager ses combles est l'un des moyens les plus économiques de gagner de la surface habitable. Mais la faisabilité dépend de plusieurs critères techniques.",
        ],
      },
      {
        heading: "Les conditions de faisabilité",
        body: [
          "Une hauteur sous plafond d'au moins 1,80 m au faîtage, une charpente adaptée et un accès possible sont les trois conditions principales. Notre étude de faisabilité est gratuite.",
        ],
      },
      {
        heading: "Le budget à prévoir",
        body: [
          "Comptez 1 000 € à 1 500 € du m² : isolation, plancher, fenêtres de toit, escalier, électricité et finitions incluses. Une surface de 30 à 40 m² revient à 20 000 € - 45 000 €.",
        ],
      },
    ],
    faq: [
      {
        q: "Faut-il un permis pour aménager des combles ?",
        a: "Si la surface de plancher dépasse certains seuils ou modifie l'aspect extérieur, une déclaration ou un permis peut être nécessaire. Nous gérons les démarches.",
      },
    ],
  },
  {
    slug: "dpe-renovation-diagnostic",
    title: "DPE et rénovation : comment améliorer son diagnostic énergétique",
    metaTitle:
      "DPE & rénovation 2026 | Améliorer son diagnostic énergétique",
    metaDescription:
      "Le DPE influence la valeur de votre bien. Découvrez quels travaux améliorent réellement votre diagnostic énergétique en Bourgogne-Franche-Comté.",
    category: "Énergie",
    serviceSlug: "renovation-energetique",
    date: "2026-06-20",
    readTime: "5 min",
    excerpt:
      "Isolation, chauffage, ventilation : les travaux qui font vraiment gagner des classes au DPE, et donc de la valeur à votre bien.",
    keywords: ["DPE", "diagnostic énergétique", "classe énergie"],
    content: [
      {
        body: [
          "Le Diagnostic de Performance Énergétique est devenu un critère de valorisation majeur. Un logement classé A ou B se vend mieux et plus cher qu'un logement classé F ou G.",
        ],
      },
      {
        heading: "Les travaux les plus rentables pour le DPE",
        body: [
          "L'isolation des combles et des murs arrive en tête, suivie du remplacement des menuiseries et du système de chauffage. Nous hiérarchisons ces travaux selon votre bien et votre budget.",
        ],
      },
      {
        heading: "L'impact sur la valeur du bien",
        body: [
          "Un passage de la classe F à C peut valoriser un bien de plusieurs milliers d'euros. C'est un investissement rentable, surtout avant une mise en vente ou en location.",
        ],
      },
    ],
    faq: [
      {
        q: "Quels travaux pour passer de F à C ?",
        a: "Généralement l'isolation complète et le remplacement du chauffage. Notre audit énergétique détermine le plan d'action le plus efficace pour votre logement.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return BLOG_POSTS.slice(0, limit);
  return BLOG_POSTS.filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aScore = a.serviceSlug === current.serviceSlug ? 1 : 0;
      const bScore = b.serviceSlug === current.serviceSlug ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}
