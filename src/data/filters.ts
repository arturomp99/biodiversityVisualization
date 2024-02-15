import { CleanDataFileHeaders } from "./data.types";

type TaxonomicLevels = Extract<
  CleanDataFileHeaders,
  "phylum" | "class" | "order" | "family" | "genus" | "species"
>;

export type TaxonomicFilterType = {
  level: TaxonomicLevels;
  value: string;
};

export type FiltersType = TaxonomicFilterType;

export const taxonomicFilter: TaxonomicFilterType = {
  level: "class",
  value: "insecta",
};
