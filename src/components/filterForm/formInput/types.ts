import { FiltersContextType } from "src/contexts/filtersContext";
import { FiltersBaseType } from "src/data/filters.types";

export type FilterInputProps<
  FilterDataType,
  T extends FiltersBaseType = FiltersBaseType
> = {
  filtersData: FilterDataType | undefined;
  addFilter?: FiltersContextType["addFilter"];
  removeFilter?: FiltersContextType["addFilter"];
  selectedFilters?: T[];
};
