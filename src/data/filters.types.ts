import { TaxonomicLevelsType } from "./data.types";

export enum TypeOfFilter {
  Taxonomic = "Taxonomic",
  Temporal = "Temporal",
  Location = "Location",
  Drop = "Drop",
  Confidence = "Confidence",
  IdentificationMethod = "Method",
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

export type LocationFilterType = FiltersBaseType & {
  latitude: number;
  longitude: number;
};

export type IdentificationMethodFilterType = FiltersBaseType & {
  methodId: string;
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
  | IdentificationMethodFilterType
  | ConfidenceFilterType
  | LocationFilterType;
