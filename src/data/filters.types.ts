import { TaxonomicLevelsType } from "./data.types";

export enum TypeOfFilter {
  Taxonomic = "Taxonomic",
}

export type TaxonomicFilterType = {
  level: TaxonomicLevelsType;
};

export type FiltersType = TaxonomicFilterType & {
  type: TypeOfFilter;
  value: string;
};
