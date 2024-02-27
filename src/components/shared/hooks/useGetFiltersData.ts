import { useEffect, useState } from "react";
import { DataType, TaxonomicLevelsType } from "src/data/data.types";

type TaxonomicFiltersDataType = Record<TaxonomicLevelsType, string[]>;

export const taxonomicLevels: TaxonomicLevelsType[] = [
  "phylum",
  "class",
  "order",
  "family",
  "genus",
  "species",
  "scientificName",
];

const asyncGetTaxonomicFiltersData = async (data: DataType[]) => {
  const taxonomicFiltersData = data.reduce<TaxonomicFiltersDataType>(
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

export const useGetFiltersData = <
  T extends { readData: DataType[] | undefined; loading: boolean }
>(
  data: T
) => {
  const [filtersData, setFiltersData] = useState<{
    data: TaxonomicFiltersDataType | undefined;
    loading: boolean;
  }>({ data: undefined, loading: true });

  useEffect(() => {
    if (data.loading || !data.readData) return;
    asyncGetTaxonomicFiltersData(data.readData).then((collectedFiltersData) =>
      setFiltersData({ data: collectedFiltersData, loading: false })
    );
  }, [data.loading, data.readData]);

  return filtersData;
};
