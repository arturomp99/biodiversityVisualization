export const taxonomicLevels: TaxonomicLevelsType[] = [
  "phylum",
  "class",
  "order",
  "family",
  "genus",
  "species",
  "scientificName",
];

export type TaxonomicLevelsType =
  | "phylum"
  | "class"
  | "order"
  | "family"
  | "genus"
  | "species"
  | "scientificName";

export type DataType = Record<TaxonomicLevelsType, string> & {
  occurrenceID: string[];
  basisOfRecord: string[];
  "Preparations (Physical Samples)": string;
  eventDate: string[];
  kingdom: string;
  taxonRank: string;
  identifiedBy: string[];
  "AI Detection Method/Model": string[];
  "Confidence%": string[];
  "Verification Method": string[];
  "Verification Name": string[];
  dateIdentified: string[];
  nomenclaturalCode: string;
  individualCount: string[];
  organismQuantity: string[];
  organismQuantityType: string[];
  decimalLatitude: string[];
  decimalLongitude: string[];
  geodeticDatum: string[];
  coordinateUncertaintyInMeters: string[];
  verbatimCoordinates: string[];
  verbatimCoordinateSystem: string[];
  higherGeography: string;
  continent: string;
  country: string;
  countryCode: string;
  stateProvince: string;
  county: string;
  locality: string;
  verbatimLocality: string;
  occurrenceRemarks: string[];
  references: string[];
  dropId: string;
  observationsNum: number;
};

export type PositionsFileHeaders =
  | "occurrenceID"
  | "scientificName"
  | "decimalLatitude"
  | "decimalLongitude"
  | "observationsNum";
