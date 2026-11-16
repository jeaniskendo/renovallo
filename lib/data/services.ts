export interface FAQItem {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  name: string;
  iconKey: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  deliverables: string[];
  priceNote: string;
  keywords: string[];
  faq: FAQItem[];
}

export const SERVICES: Service[] = [
  {
    slug: "renovation-globale",
    name: "Rénovation globale",
    iconKey: "home",
    short:
      "Rénovation complète de votre maison ou appartement : chiffrage, sélection d'artisans et coordination de A à Z.",
    metaTitle:
      "Rénovation globale en Bourgogne-Franche-Comté | Courtier en travaux RenovAllo",
    metaDescription:
      "Rénovation complète de maison ou d'appartement en Bourgogne-Franche-Comté. Chiffrage gratuit sous 72h, artisans qualifiés et suivi de chantier de A à Z.",
    h1: "Rénovation globale en Bourgogne-Franche-Comté",
    intro: [
      "Rénover un bien de A à Z est le projet le plus engageant qui soit. Chez RenovAllo, nous le pilotons comme un chantier unique : un contact unique, un chiffrage consolidé et une sélection d'artisans qualifiés dans tous les corps de métier.",
      "De la démolition à la finition, en passant par la plomberie, l'électricité, la menuiserie et les revêtements, nous coordonnons chaque intervention et contrôlons que chaque euro engagé correspond à l'avancement réel du chantier.",
    ],
    deliverables: [
      "Diagnostic et visite technique gratuits",
      "Chiffrage consolidé sous 72h, sans engagement",
      "Sélection des artisans qualifiés par corps de métier",
      "Coordination et planning des intervenants",
      "Garantie d'un prix juste et transparent",
    ],
    priceNote:
      "Comptez en moyenne 800 € à 2 000 € du m² selon l'état du bien et le niveau de finition. Nous comparons les devis pour négocier le meilleur rapport qualité/prix.",
    keywords: [
      "rénovation globale",
      "rénovation complète maison",
      "maître d'œuvre rénovation",
      "rénovation appartement",
    ],
    faq: [
      {
        q: "Quel est le prix d'une rénovation globale au m² ?",
        a: "Le prix d'une rénovation complète varie entre 800 € et 2 000 € du m² selon l'état du bien, l'ampleur des travaux et le niveau de finition. RenovAllo met en concurrence plusieurs artisans pour obtenir le meilleur rapport qualité/prix.",
      },
      {
        q: "Faut-il un maître d'œuvre pour une rénovation globale ?",
        a: "Sur un chantier multi-corps de métier, un maître d'œuvre ou un courtier en travaux sécurise le budget, le planning et la qualité. C'est exactement le rôle que nous jouons : un seul contact, des artisans vérifiés et un budget maîtrisé.",
      },
      {
        q: "Puis-je rénover tout en restant dans le logement ?",
        a: "Cela dépend de l'ampleur des travaux. Nous établissons un phasage adapté pour limiter la gêne et, si nécessaire, organiser les interventions pièce par pièce.",
      },
    ],
  },
  {
    slug: "renovation-energetique",
    name: "Rénovation énergétique",
    iconKey: "leaf",
    short:
      "Isolation, pompe à chaleur, ventilation : réduisez vos factures et profitez des aides MaPrimeRénov'.",
    metaTitle:
      "Rénovation énergétique en Bourgogne-Franche-Comté | Isolation & PAC",
    metaDescription:
      "Isolation des murs, combles, pompe à chaleur et aides MaPrimeRénov' en Bourgogne-Franche-Comté. Chiffrage gratuit et accompagnement complet par un courtier en travaux.",
    h1: "Rénovation énergétique en Bourgogne-Franche-Comté",
    intro: [
      "Avec la hausse du coût de l'énergie, rénover son logement est devenu un investissement rentable. Isolation des combles et des murs, remplacement des menuiseries, pompe à chaleur : nous identifions les travaux les plus rentables pour votre bien.",
      "Nous vous accompagnons aussi dans le montage de votre dossier MaPrimeRénov' et des aides locales, pour maximiser le financement de vos travaux.",
    ],
    deliverables: [
      "Audit énergétique et priorités de travaux",
      "Isolation des combles, murs et planchers",
      "Remplacement des menuiseries et vitrages",
      "Pompe à chaleur et ventilation performante",
      "Accompagnement MaPrimeRénov' et aides locales",
    ],
    priceNote:
      "Le reste à charge dépend fortement des aides obtenues. Une isolation des combles perdus peut coûter de 20 € à 50 € du m² avant aides.",
    keywords: [
      "rénovation énergétique",
      "isolation combles",
      "pompe à chaleur",
      "MaPrimeRénov'",
    ],
    faq: [
      {
        q: "Quelles aides pour une rénovation énergétique ?",
        a: "MaPrimeRénov', les Certificats d'Économies d'Énergie (CEE), l'éco-PTZ et les aides locales peuvent couvrir une part importante des travaux. Nous vous aidons à monter les dossiers.",
      },
      {
        q: "Quels travaux sont les plus rentables ?",
        a: "En priorité l'isolation des combles perdus et des murs, puis le remplacement des menuiseries et le système de chauffage. Nous hiérarchisons selon le retour sur investissement.",
      },
    ],
  },
  {
    slug: "isolation-ite-iti",
    name: "Isolation (ITE / ITI)",
    iconKey: "layers",
    short:
      "Isolation des murs par l'intérieur ou l'extérieur pour un confort optimal et des factures réduites.",
    metaTitle:
      "Isolation ITE & ITI en Bourgogne-Franche-Comté | Devis gratuit 72h",
    metaDescription:
      "Isolation thermique par l'intérieur (ITI) ou l'extérieur (ITE) en Bourgogne-Franche-Comté. Réduisez vos factures d'énergie avec un courtier en travaux. Devis gratuit sous 72h.",
    h1: "Isolation ITE & ITI en Bourgogne-Franche-Comté",
    intro: [
      "L'isolation des murs est le levier le plus efficace pour gagner en confort et réduire durablement vos factures. Deux techniques s'offrent à vous : l'isolation par l'intérieur (ITI) et l'isolation par l'extérieur (ITE).",
      "Nous vous aidons à choisir la solution adaptée à votre bâti et à votre budget, puis sélectionnons des artisans certifiés pour une pose irréprochable.",
    ],
    deliverables: [
      "Étude thermique et choix ITE / ITI",
      "Isolation des murs par l'extérieur (ITE)",
      "Isolation des murs par l'intérieur (ITI)",
      "Isolation des combles et planchers",
      "Accompagnement aux aides (MaPrimeRénov', CEE)",
    ],
    priceNote:
      "Une ITE coûte en moyenne 100 € à 200 € du m², une ITI 40 € à 80 € du m², avant aides. Le retour sur investissement s'observe généralement en 5 à 10 ans.",
    keywords: [
      "isolation extérieure",
      "ITE",
      "isolation intérieure",
      "ITI",
      "isolation des murs",
    ],
    faq: [
      {
        q: "ITE ou ITI : quelle différence ?",
        a: "L'ITE isole par l'extérieur (enveloppe le bâti, ne réduit pas la surface habitable), l'ITI par l'intérieur (moins chère mais réduit légèrement la surface). Nous vous conseillons selon votre maison et votre budget.",
      },
      {
        q: "L'isolation des murs est-elle éligible aux aides ?",
        a: "Oui, l'ITE et l'ITI sont éligibles à MaPrimeRénov' et aux Certificats d'Économies d'Énergie. Nous montons les dossiers pour vous.",
      },
    ],
  },
  {
    slug: "fenetres-portes-volets",
    name: "Fenêtres, portes & volets",
    iconKey: "door-open",
    short:
      "Fenêtres double vitrage, portes d'entrée et volets roulants : isolation, sécurité et confort.",
    metaTitle:
      "Fenêtres, portes & volets en Bourgogne-Franche-Comté | Menuiseries",
    metaDescription:
      "Pose de fenêtres double vitrage, portes d'entrée et volets roulants en Bourgogne-Franche-Comté. Menuiseries sur mesure posées par des artisans qualifiés, chiffrage gratuit.",
    h1: "Fenêtres, portes & volets en Bourgogne-Franche-Comté",
    intro: [
      "Fenêtres double vitrage, portes d'entrée, volets roulants ou battants : des menuiseries de qualité améliorent à la fois l'isolation, la sécurité et la valeur de votre bien.",
      "Nous sélectionnons des artisans certifiés et suivons la pose du premier au dernier réglage.",
    ],
    deliverables: [
      "Fenêtres PVC, bois ou aluminium",
      "Portes d'entrée et portes intérieures",
      "Volets roulants et battants",
      "Portes-fenêtres et baies vitrées",
      "Pose et finitions soignées",
    ],
    priceNote:
      "Comptez 500 € à 1 200 € par fenêtre posée selon le matériau et les dimensions.",
    keywords: ["fenêtres", "portes", "volets roulants", "menuiserie", "double vitrage"],
    faq: [
      {
        q: "Quel matériau pour mes fenêtres ?",
        a: "Le PVC est le plus économique, l'aluminium offre de grands vitrages et le bois un cachet authentique. Nous vous conseillons selon votre bien et votre budget.",
      },
      {
        q: "Changer ses fenêtres réduit-il la facture de chauffage ?",
        a: "Oui, des menuiseries performantes limitent fortement les déperditions thermiques et améliorent le confort acoustique.",
      },
    ],
  },
  {
    slug: "panneaux-solaires",
    name: "Panneaux solaires / Photovoltaïque",
    iconKey: "sun",
    short:
      "Produisez votre électricité : panneaux photovoltaïques, autoconsommation et revente.",
    metaTitle:
      "Panneaux solaires & photovoltaïque en Bourgogne-Franche-Comté",
    metaDescription:
      "Installation de panneaux solaires photovoltaïques en Bourgogne-Franche-Comté : autoconsommation, revente et aides. Devis gratuit sous 72h avec RenovAllo.",
    h1: "Panneaux solaires & photovoltaïque en Bourgogne-Franche-Comté",
    intro: [
      "Produire sa propre électricité est devenu un investissement rentable et écologique. Nous dimensionnons votre installation, sélectionnons les artisans et gérons les démarches de raccordement.",
      "Autoconsommation, revente du surplus ou vente totale : nous vous orientons vers la formule la plus avantageuse.",
    ],
    deliverables: [
      "Étude de faisabilité et dimensionnement",
      "Pose de panneaux photovoltaïques",
      "Onduleur et coffret de protection",
      "Raccordement au réseau (Enedis)",
      "Optimisation autoconsommation / revente",
    ],
    priceNote:
      "Une installation de 3 kWc coûte en moyenne 7 000 € à 10 000 € posée. La prime à l'autoconsommation et la revente du surplus accélèrent le retour sur investissement.",
    keywords: [
      "panneaux solaires",
      "photovoltaïque",
      "autoconsommation",
      "installation solaire",
    ],
    faq: [
      {
        q: "Mes panneaux solaires sont-ils rentables ?",
        a: "Oui, selon l'ensoleillement, l'orientation et votre consommation. En Bourgogne-Franche-Comté, le retour sur investissement se situe généralement entre 8 et 12 ans.",
      },
      {
        q: "Quelles aides pour le photovoltaïque ?",
        a: "La prime à l'autoconsommation, le tarif d'achat du surplus et un taux de TVA réduit rendent l'investissement attractif. Nous vous accompagnons sur l'ensemble des démarches.",
      },
    ],
  },
  {
    slug: "chauffage-climatisation",
    name: "Chauffage & climatisation",
    iconKey: "thermometer",
    short:
      "Pompe à chaleur, chaudière, poêle à granulés, climatisation : confort toute l'année.",
    metaTitle:
      "Chauffage & climatisation en Bourgogne-Franche-Comté | PAC & chaudière",
    metaDescription:
      "Pompe à chaleur, chaudière, poêle à granulés et climatisation en Bourgogne-Franche-Comté. Installation par des artisans qualifiés, aides incluses.",
    h1: "Chauffage & climatisation en Bourgogne-Franche-Comté",
    intro: [
      "Remplacez votre ancien système par une solution performante et économe : pompe à chaleur, chaudière à condensation ou poêle à granulés. Nous vous orientons vers la solution la plus adaptée et rentable.",
    ],
    deliverables: [
      "Étude thermique et dimensionnement",
      "Pompe à chaleur air/eau ou air/air",
      "Chaudière à condensation",
      "Poêle à granulés ou bois",
      "Climatisation réversible",
    ],
    priceNote:
      "Une pompe à chaleur air/eau coûte de 8 000 € à 15 000 € posée, avant aides MaPrimeRénov'.",
    keywords: [
      "pompe à chaleur",
      "chaudière",
      "climatisation",
      "poêle à granulés",
    ],
    faq: [
      {
        q: "Quelle pompe à chaleur choisir ?",
        a: "L'air/eau convient aux logements bien isolés avec chauffage central, l'air/air aux logements sans réseau hydraulique. Nous dimensionnons selon vos besoins et votre bâti.",
      },
    ],
  },
  {
    slug: "toiture-couverture",
    name: "Toiture & couverture",
    iconKey: "house",
    short:
      "Réfection, démoussage, zinguerie et remplacement de toiture par des couvreurs qualifiés.",
    metaTitle:
      "Toiture & couverture en Bourgogne-Franche-Comté | Courtier travaux",
    metaDescription:
      "Réfection, démoussage, zinguerie et remplacement de toiture en Bourgogne-Franche-Comté. Devis gratuit sous 72h par des couvreurs qualifiés.",
    h1: "Toiture & couverture en Bourgogne-Franche-Comté",
    intro: [
      "La toiture protège l'ensemble du bâti : une fuite non traitée dégrade rapidement tout le logement. Nous sélectionnons des couvreurs qualifiés et contrôlons la qualité de chaque intervention.",
    ],
    deliverables: [
      "Diagnostic et recherche de fuite",
      "Démoussage et nettoyage",
      "Réfection partielle ou complète",
      "Zinguerie et évacuation d'eaux pluviales",
      "Isolation de toiture",
    ],
    priceNote:
      "Une réfection de toiture coûte de 80 € à 150 € du m² selon le matériau (tuiles, ardoise, zinc).",
    keywords: [
      "toiture",
      "couverture",
      "réfection toiture",
      "zinguerie",
    ],
    faq: [
      {
        q: "Quand refaire sa toiture ?",
        a: "Dès l'apparition de fuites, de tuiles cassées ou déplacées, ou lorsque la couverture a plus de 25 ans. Un diagnostic régulier évite des dégâts coûteux.",
      },
    ],
  },
  {
    slug: "ravalement-facade",
    name: "Ravalement de façade",
    iconKey: "building",
    short:
      "Nettoyage, réparation et enduit de façade : redonnez une seconde jeunesse à votre bien.",
    metaTitle:
      "Ravalement de façade en Bourgogne-Franche-Comté | Devis gratuit",
    metaDescription:
      "Ravalement de façade, enduit et nettoyage en Bourgogne-Franche-Comté. Redonnez de la valeur à votre bien avec des artisans qualifiés. Chiffrage gratuit sous 72h.",
    h1: "Ravalement de façade en Bourgogne-Franche-Comté",
    intro: [
      "Le ravalement de façade protège votre maison des intempéries et valorise votre bien. Nettoyage, réparation des fissures et application d'un enduit adapté : nous coordonnons l'ensemble du chantier.",
    ],
    deliverables: [
      "Diagnostic de l'état de la façade",
      "Nettoyage et décapage",
      "Réparation des fissures et reprises",
      "Enduit et peinture de façade",
      "Traitement hydrofuge",
    ],
    priceNote:
      "Un ravalement complet coûte en moyenne 60 € à 120 € du m² selon l'état du support et la technique utilisée.",
    keywords: [
      "ravalement façade",
      "enduit façade",
      "rénovation façade",
      "nettoyage façade",
    ],
    faq: [
      {
        q: "Faut-il un permis pour un ravalement de façade ?",
        a: "Une déclaration préalable en mairie est généralement nécessaire, surtout si l'aspect extérieur change (couleur, matériau). Nous gérons les démarches.",
      },
    ],
  },
  {
    slug: "extension-agrandissement",
    name: "Extension & agrandissement",
    iconKey: "expand",
    short:
      "Extension ossature bois, surélévation ou maçonnerie : gagnez des m² sans déménager.",
    metaTitle:
      "Extension de maison en Bourgogne-Franche-Comté | Devis gratuit 72h",
    metaDescription:
      "Extension ossature bois, surélévation ou agrandissement en Bourgogne-Franche-Comté. Étude de faisabilité et chiffrage gratuit sous 72h avec RenovAllo.",
    h1: "Extension & agrandissement de maison en Bourgogne-Franche-Comté",
    intro: [
      "Besoin d'une chambre, d'un bureau ou d'un salon en plus ? L'extension vous fait gagner des m² sans les frais d'un déménagement. Nous réalisons l'étude de faisabilité, le dépôt de permis et la sélection des artisans.",
    ],
    deliverables: [
      "Étude de faisabilité et conseils techniques",
      "Extension ossature bois ou maçonnerie",
      "Surélévation et création d'étage",
      "Dépôt de permis de construire",
      "Coordination des artisans qualifiés",
    ],
    priceNote:
      "Comptez en moyenne 1 500 € à 2 500 € du m² pour une extension maçonnée, et 1 200 € à 1 800 € du m² en ossature bois.",
    keywords: [
      "extension maison",
      "agrandissement",
      "surélévation",
      "ossature bois",
    ],
    faq: [
      {
        q: "Faut-il un permis de construire pour une extension ?",
        a: "Au-delà de 20 m² (ou 40 m² selon le PLU), un permis de construire est obligatoire. Nous gérons l'ensemble des démarches administratives.",
      },
      {
        q: "Combien coûte une extension de 30 m² ?",
        a: "Entre 36 000 € et 75 000 € selon le type (ossature bois ou maçonnerie) et les finitions. Nous mettons en concurrence les artisans pour affiner le budget.",
      },
    ],
  },
  {
    slug: "amenagement-combles",
    name: "Aménagement de combles",
    iconKey: "warehouse",
    short:
      "Transformez vos combles perdus en surface habitable : création de chambres, salle de bain, bureau.",
    metaTitle:
      "Aménagement de combles en Bourgogne-Franche-Comté | Devis gratuit",
    metaDescription:
      "Aménagement de combles perdus ou aménageables en Bourgogne-Franche-Comté. Étude de faisabilité offerte et chiffrage gratuit sous 72h.",
    h1: "Aménagement de combles en Bourgogne-Franche-Comté",
    intro: [
      "Vos combles sont une surface dormante : transformez-les en chambres, bureau ou suite parentale. Nous vérifions la faisabilité technique (charpente, hauteur, accès) puis coordonnons les travaux.",
    ],
    deliverables: [
      "Étude de faisabilité gratuite",
      "Isolation et création de plancher",
      "Fenêtres de toit et éclairage",
      "Création de chambres ou salle de bain",
      "Escalier d'accès et finitions",
    ],
    priceNote:
      "L'aménagement de combles coûte en moyenne 1 000 € à 1 500 € du m², soit 20 000 € à 45 000 € pour 30 à 40 m².",
    keywords: [
      "aménagement combles",
      "combles perdus",
      "fenêtre de toit",
      "surélévation",
    ],
    faq: [
      {
        q: "Mes combles sont-ils aménageables ?",
        a: "Il faut une hauteur sous plafond suffisante (au moins 1,80 m au faîtage), une charpente adaptée et un accès possible. Notre étude de faisabilité est gratuite.",
      },
    ],
  },
  {
    slug: "maconnerie",
    name: "Maçonnerie & gros œuvre",
    iconKey: "brick-wall",
    short:
      "Fondations, murs, dalles, ouverture de murs porteurs : le gros œuvre en toute sécurité.",
    metaTitle:
      "Maçonnerie en Bourgogne-Franche-Comté | Gros œuvre & fondations",
    metaDescription:
      "Maçonnerie, fondations, murs porteurs, dalles et ouvertures en Bourgogne-Franche-Comté. Gros œuvre réalisé par des maçons qualifiés, chiffrage gratuit.",
    h1: "Maçonnerie & gros œuvre en Bourgogne-Franche-Comté",
    intro: [
      "Le gros œuvre conditionne la solidité de tout projet. Fondations, murs, dalles ou ouverture de murs porteurs : nous confions ces travaux à des maçons expérimentés et assurés.",
    ],
    deliverables: [
      "Fondations et dalles",
      "Montage de murs et cloisons porteuses",
      "Ouverture de murs porteurs (avec IPN)",
      "Ravalement et enduits",
      "Reprise de structure",
    ],
    priceNote:
      "Une ouverture de mur porteur avec pose d'IPN coûte de 2 500 € à 6 000 € selon la configuration.",
    keywords: ["maçon", "maçonnerie", "gros œuvre", "ouverture mur porteur"],
    faq: [
      {
        q: "Puis-je abattre un mur porteur ?",
        a: "Oui, à condition de poser une poutre porteuse (IPN) dimensionnée par un bureau d'études. Nous gérons l'étude, la déclaration de travaux et la réalisation.",
      },
    ],
  },
  {
    slug: "salle-de-bain",
    name: "Salle de bain",
    iconKey: "droplets",
    short:
      "Rénovation ou création de salle de bain clé en main, de la plomberie aux finitions.",
    metaTitle:
      "Rénovation de salle de bain en Bourgogne-Franche-Comté | Courtier travaux",
    metaDescription:
      "Rénovation ou création de salle de bain en Bourgogne-Franche-Comté. Devis précis, artisans qualifiés et suivi complet par RenovAllo.",
    h1: "Rénovation de salle de bain en Bourgogne-Franche-Comté",
    intro: [
      "La salle de bain est la pièce la plus technique de la maison : plomberie, électricité, étanchéité et finitions doivent être parfaitement coordonnées. Nous gérons l'intégralité du chantier.",
    ],
    deliverables: [
      "Dépose et préparation du support",
      "Plomberie et raccordements",
      "Électricité aux normes (volumes de sécurité)",
      "Receveur, douche, baignoire et meubles",
      "Carrelage, faïence et peinture",
    ],
    priceNote:
      "Comptez 6 000 € à 12 000 € pour une rénovation complète, et 10 000 € à 20 000 € pour une création avec gros œuvre.",
    keywords: [
      "rénovation salle de bain",
      "douche italienne",
      "plomberie salle de bain",
      "carrelage salle de bain",
    ],
    faq: [
      {
        q: "Combien de temps dure une rénovation de salle de bain ?",
        a: "Comptez 2 à 4 semaines selon l'ampleur des travaux et la disponibilité des artisans.",
      },
    ],
  },
  {
    slug: "cuisine",
    name: "Cuisine",
    iconKey: "chef-hat",
    short:
      "Conception et pose de cuisine sur mesure ou en kit, avec tous les corps de métier coordonnés.",
    metaTitle:
      "Cuisine sur mesure en Bourgogne-Franche-Comté | Rénovation cuisine",
    metaDescription:
      "Installation et rénovation de cuisine sur mesure en Bourgogne-Franche-Comté. Conception, plomberie, électricité et pose coordonnées par RenovAllo.",
    h1: "Rénovation & installation de cuisine en Bourgogne-Franche-Comté",
    intro: [
      "Une cuisine réussie combine conception, plomberie, électricité et menuiserie. Nous coordonnons tous les intervenants pour un résultat impeccable, dans les délais et le budget.",
    ],
    deliverables: [
      "Conception et plans 3D",
      "Cuisine sur mesure ou semi-mesure",
      "Raccordements plomberie et électricité",
      "Plan de travail, crédence et éclairage",
      "Pose et finitions",
    ],
    priceNote:
      "Une cuisine équipée posée coûte de 5 000 € à 15 000 € en moyenne, davantage pour le sur-mesure.",
    keywords: ["cuisine sur mesure", "rénovation cuisine", "pose cuisine"],
    faq: [
      {
        q: "Cuisine sur mesure ou en kit ?",
        a: "Le sur-mesure optimise chaque centimètre et la valeur du bien ; le kit est plus économique. Nous vous conseillons selon votre budget et votre espace.",
      },
    ],
  },
  {
    slug: "plomberie",
    name: "Plomberie",
    iconKey: "wrench",
    short:
      "Dépannage, rénovation complète, création de salle d'eau : plombiers qualifiés à votre service.",
    metaTitle:
      "Plomberie en Bourgogne-Franche-Comté | Courtier en travaux",
    metaDescription:
      "Plombier qualifié en Bourgogne-Franche-Comté : dépannage, rénovation complète, création de salle d'eau et chauffage. Chiffrage gratuit sous 72h.",
    h1: "Plomberie en Bourgogne-Franche-Comté",
    intro: [
      "Une fuite, une rénovation de salle de bain ou la création d'un réseau complet : nous mobilisons des plombiers qualifiés, assurés et réactifs sur toute la région.",
    ],
    deliverables: [
      "Dépannage et recherche de fuite",
      "Rénovation de réseau sanitaire",
      "Création de salle de bain ou cuisine",
      "Installation de chauffe-eau et ballons",
      "Robinetterie et sanitaires",
    ],
    priceNote:
      "Un dépannage simple débute autour de 150 € à 300 €, une rénovation complète de 3 000 € à 8 000 €.",
    keywords: ["plombier", "plomberie", "dépannage plomberie"],
    faq: [
      {
        q: "Comment trouver un plombier fiable ?",
        a: "RenovAllo sélectionne des plombiers qualifiés, assurés et vérifiés, et vous met en relation avec le bon artisan. Vous gardez un seul contact et un budget maîtrisé.",
      },
    ],
  },
  {
    slug: "electricite",
    name: "Électricité",
    iconKey: "zap",
    short:
      "Mise aux normes, tableau électrique, domotique et éclairage par des électriciens certifiés.",
    metaTitle:
      "Électricité en Bourgogne-Franche-Comté | Mise aux normes & domotique",
    metaDescription:
      "Mise aux normes électrique, tableau, domotique et éclairage en Bourgogne-Franche-Comté. Électriciens certifiés et chiffrage gratuit sous 72h.",
    h1: "Électricité en Bourgogne-Franche-Comté",
    intro: [
      "Une installation électrique aux normes est essentielle pour la sécurité et la valeur de votre bien. Nous faisons intervenir des électriciens certifiés pour la mise aux normes, la rénovation ou l'équipement domotique.",
    ],
    deliverables: [
      "Mise aux normes et mise en sécurité",
      "Remplacement du tableau électrique",
      "Points lumineux, prises et interrupteurs",
      "Domotique et maison connectée",
      "Attestation de conformité (Consuel)",
    ],
    priceNote:
      "Une mise aux normes complète coûte de 4 000 € à 10 000 € selon la surface et l'état de l'installation.",
    keywords: ["électricien", "électricité", "mise aux normes", "domotique"],
    faq: [
      {
        q: "Mon installation électrique est-elle à refaire ?",
        a: "Au-delà de 25 ans, ou en cas de tableau ancien, de fils dénudés ou de prises non mises à la terre, une mise aux normes est recommandée. Nous réalisons un diagnostic complet.",
      },
    ],
  },
  {
    slug: "peinture-sols",
    name: "Peinture & sols",
    iconKey: "brush",
    short:
      "Peinture, papier peint, parquet et carrelage : des finitions impeccables pour votre intérieur.",
    metaTitle:
      "Peinture & sols en Bourgogne-Franche-Comté | Courtier travaux",
    metaDescription:
      "Peinture intérieure, parquet, carrelage, sols souples et papier peint en Bourgogne-Franche-Comté. Finitions soignées par des artisans qualifiés, chiffrage gratuit.",
    h1: "Peinture & sols en Bourgogne-Franche-Comté",
    intro: [
      "Les finitions font la différence. Peinture, papier peint, parquet ou carrelage : nous sélectionnons des artisans méticuleux pour un résultat impeccable et durable.",
    ],
    deliverables: [
      "Préparation des supports et enduits",
      "Peinture intérieure",
      "Papier peint et toile de verre",
      "Pose de parquet et sols souples",
      "Pose de carrelage et faïence",
    ],
    priceNote:
      "La peinture coûte en moyenne 20 € à 40 € du m² fourni et posé, selon la préparation des supports.",
    keywords: ["peinture", "parquet", "carrelage", "sols", "papier peint"],
    faq: [
      {
        q: "Combien coûte la peinture d'une pièce ?",
        a: "Comptez 400 € à 1 200 € par pièce selon la surface et l'état des murs. Nous vous fournissons un devis détaillé sous 72h.",
      },
    ],
  },
  {
    slug: "amenagement-exterieur",
    name: "Aménagement extérieur",
    iconKey: "trees",
    short:
      "Terrasse, allée, clôture, piscine et jardin paysagé : valorisez vos espaces extérieurs.",
    metaTitle:
      "Aménagement extérieur en Bourgogne-Franche-Comté | Terrasse & piscine",
    metaDescription:
      "Terrasse, allée, clôture, piscine et jardin paysagé en Bourgogne-Franche-Comté. Valorisez vos extérieurs avec des artisans qualifiés.",
    h1: "Aménagement extérieur en Bourgogne-Franche-Comté",
    intro: [
      "Terrasse en bois ou en pierre, allée carrossable, clôture ou piscine : nous valorisons vos extérieurs pour augmenter le confort et la valeur de votre bien.",
    ],
    deliverables: [
      "Terrasse bois, composite ou dallage",
      "Allées et cour carrossables",
      "Clôtures et portails",
      "Piscine et abords",
      "Jardin paysagé et plantations",
    ],
    priceNote:
      "Une terrasse bois coûte de 80 € à 150 € du m² posé, une terrasse en dallage de 60 € à 120 € du m².",
    keywords: ["terrasse", "piscine", "clôture", "aménagement jardin"],
    faq: [
      {
        q: "Faut-il un permis pour une terrasse ?",
        a: "Généralement non pour une terrasse de plain-pied de moins de 20 m², mais le PLU peut imposer des règles. Nous vérifions la conformité de chaque projet.",
      },
    ],
  },
  {
    slug: "architecte-interieur-decoration",
    name: "Architecte d'intérieur & décoration",
    iconKey: "ruler",
    short:
      "Réaménagement d'espace, choix des matériaux et décoration : un intérieur à votre image.",
    metaTitle:
      "Architecte d'intérieur & décoration en Bourgogne-Franche-Comté",
    metaDescription:
      "Architecte d'intérieur et décoration en Bourgogne-Franche-Comté : réaménagement d'espace, matériaux, couleurs et ameublement. Devis gratuit sous 72h.",
    h1: "Architecte d'intérieur & décoration en Bourgogne-Franche-Comté",
    intro: [
      "Optimiser les volumes, harmoniser les couleurs et choisir les bons matériaux : l'architecte d'intérieur transforme votre logement en un lieu qui vous ressemble.",
      "Nous vous accompagnons de la conception à la réalisation, en coordonnant les travaux et les artisans nécessaires.",
    ],
    deliverables: [
      "Réaménagement et optimisation des espaces",
      "Plans techniques et modélisation 3D",
      "Choix des matériaux et des couleurs",
      "Mobilier, luminaires et ameublement",
      "Coordination des travaux de décoration",
    ],
    priceNote:
      "Une mission d'architecte d'intérieur coûte en moyenne 1 500 € à 6 000 € selon la surface et l'ampleur du projet. La modélisation 3D est souvent offerte.",
    keywords: [
      "architecte d'intérieur",
      "décoration",
      "réaménagement",
      "design intérieur",
    ],
    faq: [
      {
        q: "Quelle est la différence entre un architecte d'intérieur et un décorateur ?",
        a: "L'architecte d'intérieur peut modifier les volumes et l'agencement (cloisons, éclairage technique), tandis que le décorateur travaille surtout sur l'ameublement et les finitions. Nous vous orientons selon votre projet.",
      },
    ],
  },
  {
    slug: "autre-projet",
    name: "Autre projet / Conseil",
    iconKey: "circle-help",
    short:
      "Un projet particulier ? Parlez-nous-en : nous vous orientons vers la bonne solution.",
    metaTitle:
      "Conseil & projet sur mesure en rénovation | Bourgogne-Franche-Comté",
    metaDescription:
      "Un projet de rénovation particulier en Bourgogne-Franche-Comté ? RenovAllo vous conseille et vous oriente vers les bons artisans. Devis gratuit sous 72h.",
    h1: "Conseil & projet sur mesure en Bourgogne-Franche-Comté",
    intro: [
      "Vous ne savez pas exactement dans quelle catégorie classer votre projet ? Aucun souci : décrivez-le, et notre équipe de courtiers en travaux vous orientera vers la meilleure solution et les bons artisans.",
    ],
    deliverables: [
      "Écoute et analyse de votre besoin",
      "Conseil et recommandations personnalisées",
      "Orientation vers les bons corps de métier",
      "Chiffrage gratuit sous 72h",
      "Mise en relation avec des artisans qualifiés",
    ],
    priceNote:
      "Le conseil et le chiffrage sont gratuits et sans engagement. Vous ne payez rien tant que vous n'avez pas validé votre projet.",
    keywords: ["conseil rénovation", "projet sur mesure", "devis travaux gratuit"],
    faq: [
      {
        q: "Puis-je décrire librement mon projet ?",
        a: "Oui, décrivez votre projet dans le formulaire (surface, objectif, délais). Un courtier en travaux vous recontacte sous 72h pour vous orienter.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesBySlugs(slugs: string[]): Service[] {
  return SERVICES.filter((s) => slugs.includes(s.slug));
}
