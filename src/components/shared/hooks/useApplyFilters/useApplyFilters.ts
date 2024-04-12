import { SetStateAction, useEffect } from "react";
import { useFiltersContext } from "src/contexts/filtersContext";
import { filterTaxonomicData } from "./filterTaxonomicData";
import { filterTemporalData } from "./filterTemporalData";
import { isTaxonomicDataType, isTemporalDataType } from "src/utils/bodyguards";
import { FiltersType } from "src/data/filters.types";

export const useApplyFilters = <Data>(
  dataRef: Data[] | undefined,
  setData: (value: SetStateAction<Data[] | undefined>) => void,
  onFiltersApplied?: () => void,
  additionalFilters?: FiltersType[]
) => {
  const { filters: contextFilters } = useFiltersContext();
  const filters = [...contextFilters, ...(additionalFilters ?? [])];

  useEffect(() => {
    setData(() => {
      if (!filters || filters.length === 0 || !dataRef) {
        return dataRef;
      }
      if (isTaxonomicDataType(dataRef)) {
        return filterTaxonomicData(dataRef, filters) as Data[];
      }
      if (isTemporalDataType(dataRef)) {
        return filterTemporalData(dataRef, filters) as Data[];
      }
    });
    onFiltersApplied && onFiltersApplied();
  }, [filters, dataRef]);
};
