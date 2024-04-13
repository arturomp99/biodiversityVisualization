import { TaxonomicLevelsType } from "./data.types";

export enum TypeOfFilter {
  Taxonomic = "Taxonomic",
  Temporal = "Temporal",
  Drop = "Drop",
  Confidence = "Confidence",
}

export type FiltersBaseType = {
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

export type ConfidenceFilterType = FiltersBaseType & {
  confidenceLevel: number;
};

export type FiltersType =
  | TaxonomicFilterType
  | TemporalFilterType
  | DropFilterType
  | ConfidenceFilterType;
