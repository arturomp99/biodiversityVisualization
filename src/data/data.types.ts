export type TaxonomicLevelsType =
  | "phylum"
  | "class"
  | "order"
  | "family"
  | "genus"
  | "species"
  | "scientificName";

export type CleanDataFileHeaders =
  | TaxonomicLevelsType
  | "id"
  | "occurrenceID"
  | "basisOfRecord"
  | "Preparations (Physical Samples)"
  | "eventDate"
  | "scientificName"
  | "kingdom"
  | "taxonRank"
  | "AI Detection Method/Model"
  | "Confidence%"
  | "Verification Name"
  | "Verification Method"
  | "nomenclaturalCode"
  | "individualCount"
  | "organismQuantity"
  | "decimalLatitude"
  | "decimalLongitude"
  | "geodeticDatum"
  | "coordinateUncertaintyInMeters"
  | "latitude"
  | "longitude"
  | "higherGeography"
  | "continent"
  | "country"
  | "countryCode"
  | "stateProvince"
  | "county"
  | "locality"
  | "verbatimLocality"
  | "occurrenceRemarks"
  | "references"
  | "organismQuantityType"
  | "sensorID"
  | "observationsNum";

export type DataType = Record<CleanDataFileHeaders, string | string[]>;

export type SensorsFileHeaders =
  | "sensorId"
  | "latitude"
  | "longitude"
  | "observationsNum";
