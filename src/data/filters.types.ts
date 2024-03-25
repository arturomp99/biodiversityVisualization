import { TaxonomicLevelsType } from "./data.types";

export enum TypeOfFilter {
  Taxonomic = "Taxonomic",
  Temporal = "Temporal",
  Drop = "Drop",
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

export type DropFilterType = FiltersBaseType & {
  dropId: string;
};

export type FiltersType =
  | TaxonomicFilterType
  | TemporalFilterType
  | DropFilterType;
