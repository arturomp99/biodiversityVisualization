import React, { useCallback } from "react";
import { FilterSectionContainer } from "./styles";
import { useFiltersContext } from "src/contexts/filtersContext";
import { Chip } from "@nextui-org/react";
import { FiltersType } from "src/data/filters";

export const FilterSection = () => {
  const { filters, removeFilter } = useFiltersContext();

  const onFilterClosed = useCallback((filter: FiltersType) => {
    if (!removeFilter) {
      return;
    }
    removeFilter(filter);
  }, []);

  return (
    <FilterSectionContainer>
      {filters.map((filter, index) => (
        <Chip
          key={index}
          onClose={() => onFilterClosed(filter)}
        >{`${filter?.level}: ${filter.value}`}</Chip>
      ))}
    </FilterSectionContainer>
  );
};