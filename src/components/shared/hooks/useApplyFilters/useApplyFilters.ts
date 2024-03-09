import { SetStateAction, useEffect } from "react";
import { useFiltersContext } from "src/contexts/filtersContext";
import { filterTaxonomicData } from "./filterTaxonomicData";
import { filterTemporalData } from "./filterTemporalData";
import { isTaxonomicDataType, isTemporalDataType } from "src/utils/bodyguards";

export const useApplyFilters = <Data>(
  dataRef: Data[] | undefined,
  setData: (value: SetStateAction<Data[] | undefined>) => void
) => {
  const { filters } = useFiltersContext();

  useEffect(() => {
    setData(() => {
      if (!filters || filters.length === 0 || !dataRef) {
        return dataRef;
      }
      if (isTaxonomicDataType(dataRef)) {
        console.log("APPLY TAXONOMIC FILTER");
        return filterTaxonomicData(dataRef, filters) as Data[];
      }
      if (isTemporalDataType(dataRef)) {
        return filterTemporalData(dataRef, filters) as Data[];
      }
    });
  }, [filters, dataRef]);
};
