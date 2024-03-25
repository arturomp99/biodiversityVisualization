import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { FiltersType } from "src/data/filters.types";
import { isEqual } from "lodash";
import { isTemporalFilterType } from "src/utils/bodyguards";

export type FiltersContextType = {
  filters: FiltersType[];
  addFilter?: (filter: FiltersType) => void;
  removeFilter?: (filter: FiltersType) => void;
  removeAllFilters?: () => void;
};

const FiltersContext = createContext<FiltersContextType>({
  filters: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addFilter: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFilter: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeAllFilters: () => {},
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

  const removeAllFilters = useCallback<
    NonNullable<FiltersContextType["removeAllFilters"]>
  >(() => {
    setFilters(() => []);
  }, []);

  const addFilter = useCallback<NonNullable<FiltersContextType["addFilter"]>>(
    (filter: FiltersType) => {
      if (isTemporalFilterType(filter)) {
        setFilters((previousFilters) => {
          const temporalFilterIndex = previousFilters.findIndex(
            (previousFilter) => isTemporalFilterType(previousFilter)
          );
          // If the temporal filter is there, modify it
          if (temporalFilterIndex !== -1) {
            previousFilters[temporalFilterIndex] = filter;
            return [...previousFilters];
          }
          return [...previousFilters, filter];
        });
      } else {
        setFilters((previousFilters) => [...previousFilters, filter]);
      }
    },
    []
  );

  return (
    <FiltersContext.Provider
      value={{ filters, addFilter, removeFilter, removeAllFilters }}
    >
      {props.children}
    </FiltersContext.Provider>
  );
};
