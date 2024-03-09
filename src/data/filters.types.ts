import { TaxonomicLevelsType } from "./data.types";

export enum TypeOfFilter {
  Taxonomic = "Taxonomic",
  Temporal = "Temporal",
}

type FiltersBaseType = {
  type: TypeOfFilter;
  value: string;
};

export type TaxonomicFilterType = FiltersBaseType & {
  level: TaxonomicLevelsType;
};

export type TemporalFilterType = FiltersBaseType & {
  minTime: number;
  maxTime: number;
};

export type FiltersType = TaxonomicFilterType;
