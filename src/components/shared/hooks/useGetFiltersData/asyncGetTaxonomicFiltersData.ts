import { DataType, TaxonomicLevelsType } from "src/data/data.types";

export type TaxonomicFiltersDataType = {
  data: Record<TaxonomicLevelsType, string[]>;
  loading: boolean;
};

export const taxonomicLevels: TaxonomicLevelsType[] = [
  "phylum",
  "class",
  "order",
  "family",
  "genus",
  "species",
  "scientificName",
];

export const asyncGetTaxonomicFiltersData = async (data: DataType[]) => {
  const taxonomicFiltersData = data.reduce<TaxonomicFiltersDataType["data"]>(
    (result, currentObject) => {
      for (const level of taxonomicLevels) {
        const existingLevel = result[level].find(
          (value) => value === currentObject[level]
        );
        !existingLevel && result[level].push(currentObject[level] as string);
      }
      return result;
    },
    {
      phylum: [],
      class: [],
      order: [],
      family: [],
      genus: [],
      species: [],
      scientificName: [],
    }
  );

  return taxonomicFiltersData;
};
