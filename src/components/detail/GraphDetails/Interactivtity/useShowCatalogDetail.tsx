import { useEffect, useState } from "react";
import { useFiltersContext } from "src/contexts/filtersContext";
import { DataType } from "src/data/data.types";

export const useShowCatalogDetail = () => {
  const [catalogScientificNames, setCatalogScientificNames] =
    useState<DataType["scientificName"][]>();

  const { filters } = useFiltersContext();
  useEffect(() => setCatalogScientificNames(() => undefined), [filters]);

  return {
    catalogScientificNames,
    showCatalogHandler: setCatalogScientificNames,
  };
};
