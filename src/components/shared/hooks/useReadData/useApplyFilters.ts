import { SetStateAction, useEffect } from "react";

import { useFiltersContext } from "src/contexts/filtersContext";
import { DataType } from "src/data/data.types";

export const useApplyFilters = (
  dataRef: DataType[] | undefined,
  setData: (value: SetStateAction<DataType[] | undefined>) => void
) => {
  const { filters } = useFiltersContext();

  useEffect(() => {
    setData(() => {
      if (!dataRef) return;
      if (!filters || filters.length === 0) return dataRef;
      return dataRef.filter((dataEntry) =>
        filters.some((filter) => {
          const dataEntryValue = dataEntry[filter.level] as string;
          return (
            dataEntryValue.toLocaleLowerCase() ===
            filter.value.toLocaleLowerCase()
          );
        })
      );
    });
  }, [filters, dataRef]);
};
