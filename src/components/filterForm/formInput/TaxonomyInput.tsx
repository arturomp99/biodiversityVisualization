import React, { useCallback } from "react";
import { AutocompleteItem } from "@nextui-org/react";
import { useDataContext } from "src/contexts/dataContext";
import { taxonomicLevels } from "src/components/shared/hooks/useGetFiltersData";
import { ControlledAutocomplete } from "../components/ControlledAutocomplete";
import { useFiltersContext } from "src/contexts/filtersContext";
import { TaxonomicLevelsType } from "src/data/data.types";
import { TypeOfFilter } from "src/data/filters.types";

export const TaxonomyInput = () => {
  const { filtersData: taxonomicFiltersData } = useDataContext();
  const { addFilter, removeFilter } = useFiltersContext();

  const taxonomicLevelFilterHandler = useCallback(
    (level: TaxonomicLevelsType, value?: number) => {
      if (!addFilter || !removeFilter || !taxonomicFiltersData.data || !value) {
        return;
      }
      addFilter({
        level,
        value: taxonomicFiltersData.data[level][value],
        type: TypeOfFilter.Taxonomic,
      });
    },
    [addFilter, removeFilter, taxonomicFiltersData.data]
  );

  // Use disableSelectorIconRotation to avoid the small flickering bug
  return taxonomicLevels.map((level, levelKey) => (
    <ControlledAutocomplete
      key={levelKey}
      label={`Filter by ${level}`}
      loading={taxonomicFiltersData.loading}
      onValueChanged={(value?: number) =>
        taxonomicLevelFilterHandler(level, value)
      }
    >
      {taxonomicFiltersData.data &&
        taxonomicFiltersData.data[level].map((levelElement, elementKey) => (
          <AutocompleteItem key={elementKey}>{levelElement}</AutocompleteItem>
        ))}
    </ControlledAutocomplete>
  ));
};
