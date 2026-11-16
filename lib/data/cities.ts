export interface City {
  slug: string;
  name: string;
  postalCode: string;
  department: string;
  departmentCode: string;
  lat: number;
  lng: number;
}

export const CITIES: City[] = [
  // Côte-d'Or (21)
  { slug: "dijon", name: "Dijon", postalCode: "21000", department: "Côte-d'Or", departmentCode: "21", lat: 47.322, lng: 5.0415 },
  { slug: "beaune", name: "Beaune", postalCode: "21200", department: "Côte-d'Or", departmentCode: "21", lat: 47.0246, lng: 4.839 },
  { slug: "chenove", name: "Chenôve", postalCode: "21300", department: "Côte-d'Or", departmentCode: "21", lat: 47.291, lng: 5.007 },
  { slug: "talant", name: "Talant", postalCode: "21240", department: "Côte-d'Or", departmentCode: "21", lat: 47.34, lng: 5.01 },
  { slug: "quetigny", name: "Quetigny", postalCode: "21800", department: "Côte-d'Or", departmentCode: "21", lat: 47.313, lng: 5.108 },
  { slug: "fontaine-les-dijon", name: "Fontaine-lès-Dijon", postalCode: "21121", department: "Côte-d'Or", departmentCode: "21", lat: 47.343, lng: 5.02 },
  { slug: "auxonne", name: "Auxonne", postalCode: "21130", department: "Côte-d'Or", departmentCode: "21", lat: 47.194, lng: 5.388 },
  { slug: "genlis", name: "Genlis", postalCode: "21110", department: "Côte-d'Or", departmentCode: "21", lat: 47.242, lng: 5.218 },
  { slug: "nuits-saint-georges", name: "Nuits-Saint-Georges", postalCode: "21700", department: "Côte-d'Or", departmentCode: "21", lat: 47.137, lng: 4.95 },
  { slug: "montbard", name: "Montbard", postalCode: "21500", department: "Côte-d'Or", departmentCode: "21", lat: 47.623, lng: 4.337 },
  { slug: "longvic", name: "Longvic", postalCode: "21600", department: "Côte-d'Or", departmentCode: "21", lat: 47.287, lng: 5.064 },
  { slug: "marsannay-la-cote", name: "Marsannay-la-Côte", postalCode: "21160", department: "Côte-d'Or", departmentCode: "21", lat: 47.271, lng: 4.989 },

  // Doubs (25)
  { slug: "besancon", name: "Besançon", postalCode: "25000", department: "Doubs", departmentCode: "25", lat: 47.2378, lng: 6.0241 },
  { slug: "montbeliard", name: "Montbéliard", postalCode: "25200", department: "Doubs", departmentCode: "25", lat: 47.5095, lng: 6.7985 },
  { slug: "pontarlier", name: "Pontarlier", postalCode: "25300", department: "Doubs", departmentCode: "25", lat: 46.9061, lng: 6.3556 },
  { slug: "audincourt", name: "Audincourt", postalCode: "25400", department: "Doubs", departmentCode: "25", lat: 47.484, lng: 6.841 },
  { slug: "valentigney", name: "Valentigney", postalCode: "25700", department: "Doubs", departmentCode: "25", lat: 47.465, lng: 6.831 },
  { slug: "morteau", name: "Morteau", postalCode: "25500", department: "Doubs", departmentCode: "25", lat: 47.0575, lng: 6.606 },
  { slug: "seloncourt", name: "Seloncourt", postalCode: "25230", department: "Doubs", departmentCode: "25", lat: 47.459, lng: 6.861 },
  { slug: "bethoncourt", name: "Bethoncourt", postalCode: "25200", department: "Doubs", departmentCode: "25", lat: 47.534, lng: 6.806 },
  { slug: "baume-les-dames", name: "Baume-les-Dames", postalCode: "25110", department: "Doubs", departmentCode: "25", lat: 47.352, lng: 6.36 },
  { slug: "ornans", name: "Ornans", postalCode: "25290", department: "Doubs", departmentCode: "25", lat: 47.106, lng: 6.143 },
  { slug: "pont-de-roide", name: "Pont-de-Roide-Vermondans", postalCode: "25150", department: "Doubs", departmentCode: "25", lat: 47.387, lng: 6.77 },

  // Jura (39)
  { slug: "dole", name: "Dole", postalCode: "39100", department: "Jura", departmentCode: "39", lat: 47.0975, lng: 5.489 },
  { slug: "lons-le-saunier", name: "Lons-le-Saunier", postalCode: "39000", department: "Jura", departmentCode: "39", lat: 46.6745, lng: 5.555 },
  { slug: "saint-claude", name: "Saint-Claude", postalCode: "39200", department: "Jura", departmentCode: "39", lat: 46.387, lng: 5.863 },
  { slug: "champagnole", name: "Champagnole", postalCode: "39300", department: "Jura", departmentCode: "39", lat: 46.747, lng: 5.91 },
  { slug: "morez", name: "Morez", postalCode: "39400", department: "Jura", departmentCode: "39", lat: 46.522, lng: 6.023 },
  { slug: "poligny", name: "Poligny", postalCode: "39800", department: "Jura", departmentCode: "39", lat: 46.835, lng: 5.71 },
  { slug: "arbois", name: "Arbois", postalCode: "39600", department: "Jura", departmentCode: "39", lat: 46.903, lng: 5.774 },
  { slug: "salins-les-bains", name: "Salins-les-Bains", postalCode: "39110", department: "Jura", departmentCode: "39", lat: 46.941, lng: 5.876 },

  // Nièvre (58)
  { slug: "nevers", name: "Nevers", postalCode: "58000", department: "Nièvre", departmentCode: "58", lat: 46.993, lng: 3.157 },
  { slug: "cosne-cours-sur-loire", name: "Cosne-Cours-sur-Loire", postalCode: "58200", department: "Nièvre", departmentCode: "58", lat: 47.411, lng: 2.925 },
  { slug: "varennes-vauzelles", name: "Varennes-Vauzelles", postalCode: "58640", department: "Nièvre", departmentCode: "58", lat: 47.017, lng: 3.144 },
  { slug: "decize", name: "Decize", postalCode: "58300", department: "Nièvre", departmentCode: "58", lat: 46.829, lng: 3.459 },
  { slug: "la-charite-sur-loire", name: "La Charité-sur-Loire", postalCode: "58400", department: "Nièvre", departmentCode: "58", lat: 47.177, lng: 3.019 },
  { slug: "clamecy", name: "Clamecy", postalCode: "58500", department: "Nièvre", departmentCode: "58", lat: 47.46, lng: 3.52 },
  { slug: "guerigny", name: "Guérigny", postalCode: "58130", department: "Nièvre", departmentCode: "58", lat: 47.087, lng: 3.195 },
  { slug: "imphy", name: "Imphy", postalCode: "58160", department: "Nièvre", departmentCode: "58", lat: 46.929, lng: 3.261 },
  { slug: "fourchambault", name: "Fourchambault", postalCode: "58600", department: "Nièvre", departmentCode: "58", lat: 47.016, lng: 3.084 },

  // Haute-Saône (70)
  { slug: "vesoul", name: "Vesoul", postalCode: "70000", department: "Haute-Saône", departmentCode: "70", lat: 47.6225, lng: 6.155 },
  { slug: "hericourt", name: "Héricourt", postalCode: "70400", department: "Haute-Saône", departmentCode: "70", lat: 47.578, lng: 6.76 },
  { slug: "gray", name: "Gray", postalCode: "70100", department: "Haute-Saône", departmentCode: "70", lat: 47.444, lng: 5.592 },
  { slug: "lure", name: "Lure", postalCode: "70200", department: "Haute-Saône", departmentCode: "70", lat: 47.683, lng: 6.496 },
  { slug: "luxeuil-les-bains", name: "Luxeuil-les-Bains", postalCode: "70300", department: "Haute-Saône", departmentCode: "70", lat: 47.816, lng: 6.381 },
  { slug: "saint-loup-sur-semouse", name: "Saint-Loup-sur-Semouse", postalCode: "70800", department: "Haute-Saône", departmentCode: "70", lat: 47.883, lng: 6.273 },

  // Saône-et-Loire (71)
  { slug: "chalon-sur-saone", name: "Chalon-sur-Saône", postalCode: "71100", department: "Saône-et-Loire", departmentCode: "71", lat: 46.7808, lng: 4.8539 },
  { slug: "macon", name: "Mâcon", postalCode: "71000", department: "Saône-et-Loire", departmentCode: "71", lat: 46.3067, lng: 4.828 },
  { slug: "le-creusot", name: "Le Creusot", postalCode: "71200", department: "Saône-et-Loire", departmentCode: "71", lat: 46.805, lng: 4.44 },
  { slug: "montceau-les-mines", name: "Montceau-les-Mines", postalCode: "71300", department: "Saône-et-Loire", departmentCode: "71", lat: 46.667, lng: 4.367 },
  { slug: "autun", name: "Autun", postalCode: "71400", department: "Saône-et-Loire", departmentCode: "71", lat: 46.95, lng: 4.3 },
  { slug: "tournus", name: "Tournus", postalCode: "71700", department: "Saône-et-Loire", departmentCode: "71", lat: 46.563, lng: 4.907 },
  { slug: "louhans", name: "Louhans", postalCode: "71500", department: "Saône-et-Loire", departmentCode: "71", lat: 46.628, lng: 5.222 },
  { slug: "paray-le-monial", name: "Paray-le-Monial", postalCode: "71600", department: "Saône-et-Loire", departmentCode: "71", lat: 46.452, lng: 4.12 },
  { slug: "digoin", name: "Digoin", postalCode: "71160", department: "Saône-et-Loire", departmentCode: "71", lat: 46.482, lng: 3.978 },
  { slug: "gueugnon", name: "Gueugnon", postalCode: "71130", department: "Saône-et-Loire", departmentCode: "71", lat: 46.601, lng: 4.06 },
  { slug: "chagny", name: "Chagny", postalCode: "71150", department: "Saône-et-Loire", departmentCode: "71", lat: 46.91, lng: 4.75 },

  // Yonne (89)
  { slug: "auxerre", name: "Auxerre", postalCode: "89000", department: "Yonne", departmentCode: "89", lat: 47.7976, lng: 3.5667 },
  { slug: "sens", name: "Sens", postalCode: "89100", department: "Yonne", departmentCode: "89", lat: 48.1975, lng: 3.2833 },
  { slug: "joigny", name: "Joigny", postalCode: "89300", department: "Yonne", departmentCode: "89", lat: 47.983, lng: 3.397 },
  { slug: "avallon", name: "Avallon", postalCode: "89200", department: "Yonne", departmentCode: "89", lat: 47.49, lng: 3.909 },
  { slug: "migennes", name: "Migennes", postalCode: "89400", department: "Yonne", departmentCode: "89", lat: 47.965, lng: 3.511 },
  { slug: "tonnerre", name: "Tonnerre", postalCode: "89700", department: "Yonne", departmentCode: "89", lat: 47.856, lng: 3.973 },
  { slug: "villeneuve-sur-yonne", name: "Villeneuve-sur-Yonne", postalCode: "89500", department: "Yonne", departmentCode: "89", lat: 48.082, lng: 3.294 },
  { slug: "appoigny", name: "Appoigny", postalCode: "89380", department: "Yonne", departmentCode: "89", lat: 47.877, lng: 3.529 },

  // Territoire de Belfort (90)
  { slug: "belfort", name: "Belfort", postalCode: "90000", department: "Territoire de Belfort", departmentCode: "90", lat: 47.6397, lng: 6.8638 },
  { slug: "delle", name: "Delle", postalCode: "90100", department: "Territoire de Belfort", departmentCode: "90", lat: 47.508, lng: 7.0 },
  { slug: "valdoie", name: "Valdoie", postalCode: "90300", department: "Territoire de Belfort", departmentCode: "90", lat: 47.664, lng: 6.843 },
  { slug: "beaucourt", name: "Beaucourt", postalCode: "90500", department: "Territoire de Belfort", departmentCode: "90", lat: 47.486, lng: 6.924 },
  { slug: "grandvillars", name: "Grandvillars", postalCode: "90600", department: "Territoire de Belfort", departmentCode: "90", lat: 47.54, lng: 6.971 },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getCitiesByDepartment(code: string): City[] {
  return CITIES.filter((c) => c.departmentCode === code);
}
