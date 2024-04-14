import { SetStateAction, useEffect } from "react";
import { useFiltersContext } from "src/contexts/filtersContext";
import { filterTaxonomicData } from "./filterTaxonomicData";
import { DataType } from "src/data/data.types";

export const useApplyFilters = <Data extends DataType>(
  dataRef: Data[] | undefined,
  setData: (value: SetStateAction<Data[] | undefined>) => void,
  onFiltersApplied?: () => void,
  catalogScientificNames?: string[]
) => {
  const { filters } = useFiltersContext();

  useEffect(() => {
    setData(() => {
      if (!dataRef) {
        return;
      }
      const filteredTaxonomicData =
        !filters || filters.length === 0
          ? dataRef
          : (filterTaxonomicData(dataRef, filters) as Data[]);
      return catalogScientificNames
        ? filteredTaxonomicData.filter((filteredDataObservation) =>
            catalogScientificNames.find(
              (catalogScientificName) =>
                filteredDataObservation.scientificName === catalogScientificName
            )
          )
        : filteredTaxonomicData;
    });
    onFiltersApplied && onFiltersApplied();
  }, [filters, dataRef, catalogScientificNames]);
};
