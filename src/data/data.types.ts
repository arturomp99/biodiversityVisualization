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
  | "kingdom"
  | "taxonRank"
  | "identifiedBy"
  | "AI Detection Method/Model"
  | "Confidence%"
  | "Verification Name"
  | "Verification Method"
  | "dateIdentified"
  | "nomenclaturalCode"
  | "individualCount"
  | "organismQuantity"
  | "organismQuantityType"
  | "decimalLatitude"
  | "decimalLongitude"
  | "geodeticDatum"
  | "coordinateUncertaintyInMeters"
  | "verbatimCoordinates"
  | "verbatimCoordinateSystem"
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
  | "observationsNum";

export type DataType = Record<CleanDataFileHeaders, string | string[]>;

export type SensorsFileHeaders =
  | "sensorId"
  | "latitude"
  | "longitude"
  | "observationsNum";
