import React, { useCallback } from "react";
import { StyledFilterSectionLayout } from "./styles";
import { useFiltersContext } from "src/contexts/filtersContext";
import { Chip } from "@nextui-org/react";
import { FiltersType } from "src/data/filters.types";
import {
  isConfidenceFilterType,
  isDropFilterType,
  isTaxonomicFilterType,
  isTemporalFilterType,
} from "src/utils/bodyguards";

const getFilterString = (filter: FiltersType) => {
  if (isTaxonomicFilterType(filter)) {
    return `${filter?.level}: ${filter.value}`;
  }
  if (isTemporalFilterType(filter)) {
    const minDate = new Date(filter.minTime);
    const maxDate = new Date(filter.maxTime);
    const minDateString = `${minDate.getDate()}/${minDate.getMonth()} ${minDate.getHours()}:${minDate.getMinutes()}:${minDate.getSeconds()}`;
    const maxDateString = `${maxDate.getDate()}/${minDate.getMonth()} ${maxDate.getHours()}:${maxDate.getMinutes()}:${maxDate.getSeconds()}`;
    return `Time: from ${minDateString} to ${maxDateString}`;
  }
  if (isDropFilterType(filter)) {
    return `DROP: ${filter.dropId}`;
  }
  if (isConfidenceFilterType(filter)) {
    return `Confidence > ${(filter.confidenceLevel * 100) | 0}%`;
  }
  return "unrecognized filter";
};

export const FilterSection = () => {
  const { filters, removeFilter } = useFiltersContext();

  const onFilterClosed = useCallback((filter: FiltersType) => {
    if (!removeFilter) {
      return;
    }
    removeFilter(filter);
  }, []);

  return (
    <StyledFilterSectionLayout>
      {filters.map((filter, index) => (
        <Chip
          key={index}
          onClose={() => onFilterClosed(filter)}
          className="bg-green-800 text-white"
        >
          {getFilterString(filter)}
        </Chip>
      ))}
    </StyledFilterSectionLayout>
  );
};
