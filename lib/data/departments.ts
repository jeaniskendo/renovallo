export interface Department {
  code: string;
  name: string;
  slug: string;
}

export const DEPARTMENTS: Department[] = [
  { code: "21", name: "Côte-d'Or", slug: "cote-dor" },
  { code: "25", name: "Doubs", slug: "doubs" },
  { code: "39", name: "Jura", slug: "jura" },
  { code: "58", name: "Nièvre", slug: "nievre" },
  { code: "70", name: "Haute-Saône", slug: "haute-saone" },
  { code: "71", name: "Saône-et-Loire", slug: "saone-et-loire" },
  { code: "89", name: "Yonne", slug: "yonne" },
  { code: "90", name: "Territoire de Belfort", slug: "territoire-de-belfort" },
];
