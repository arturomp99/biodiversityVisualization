import { TaxonomicLevelsType } from "./data.types";

export enum TypeOfFilter {
  Taxonomic = "Taxonomic",
  Temporal = "Temporal",
}

type FiltersBaseType = {
  type: TypeOfFilter;
};

export type TaxonomicFilterType = FiltersBaseType & {
  level: TaxonomicLevelsType;
  value: string;
};

export type TemporalFilterType = FiltersBaseType & {
  minTime: number;
  maxTime: number;
};

export type FiltersType = TaxonomicFilterType | TemporalFilterType;
