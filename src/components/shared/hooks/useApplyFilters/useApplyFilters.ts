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
      if (!filters || filters.length === 0 || !dataRef) {
        return dataRef;
      }
      return filterTaxonomicData(dataRef, filters) as Data[];
    });
    onFiltersApplied && onFiltersApplied();
  }, [filters, dataRef]);

  useEffect(() => {
    if (!catalogScientificNames) {
      return;
    }
    setData((previousData) =>
      previousData?.filter((previousDataObservation) =>
        catalogScientificNames.find(
          (catalogScientificName) =>
            previousDataObservation.scientificName === catalogScientificName
        )
      )
    );
  }, [catalogScientificNames]);
};
