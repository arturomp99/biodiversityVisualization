import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { FiltersType } from "src/data/filters.types";
import { isEqual } from "lodash";

type FiltersContextType = {
  filters: FiltersType[];
  addFilter?: (filter: FiltersType) => void;
  removeFilter?: (filter: FiltersType) => void;
};

const FiltersContext = createContext<FiltersContextType>({
  filters: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addFilter: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFilter: () => {},
});

export const useFiltersContext = () => useContext(FiltersContext);

export const FiltersContextProvider = (props: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FiltersContextType["filters"]>([]);

  const removeFilter = useCallback<
    NonNullable<FiltersContextType["removeFilter"]>
  >((filterToRemove) => {
    setFilters((previousFilters) =>
      previousFilters.filter(
        (filterEntry) => !isEqual(filterEntry, filterToRemove)
      )
    );
  }, []);

  const addFilter = useCallback<NonNullable<FiltersContextType["addFilter"]>>(
    (filter: FiltersType) => {
      setFilters((previousFilters) => [...previousFilters, filter]);
    },
    []
  );

  return (
    <FiltersContext.Provider value={{ filters, addFilter, removeFilter }}>
      {props.children}
    </FiltersContext.Provider>
  );
};
