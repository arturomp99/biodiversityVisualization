import React, { useCallback } from "react";
import { AutocompleteItem } from "@nextui-org/react";
import { useDataContext } from "src/contexts/dataContext";
import { ControlledAutocomplete } from "../components/ControlledAutocomplete";
import { useFiltersContext } from "src/contexts/filtersContext";
import { TaxonomicLevelsType } from "src/data/data.types";
import { TypeOfFilter } from "src/data/filters.types";
import { taxonomicLevels } from "src/components/shared/hooks/useGetFiltersData/asyncGetTaxonomicFiltersData";

export const TaxonomyInput = () => {
  const { filtersData } = useDataContext();
  const { addFilter } = useFiltersContext();

  const taxonomicLevelFilterHandler = useCallback(
    (level: TaxonomicLevelsType, value?: number) => {
      const taxonomicFiltersData = filtersData?.taxonomic;
      if (!addFilter || !taxonomicFiltersData?.data || !value) {
        return;
      }
      addFilter({
        level,
        value: taxonomicFiltersData.data[level][value],
        type: TypeOfFilter.Taxonomic,
      });
    },
    [addFilter, filtersData?.taxonomic?.data]
  );

  // Use disableSelectorIconRotation to avoid the small flickering bug
  return taxonomicLevels.map((level, levelKey) => (
    <ControlledAutocomplete
      key={levelKey}
      label={`Filter by ${level}`}
      loading={filtersData?.taxonomic?.loading || false}
      onValueChanged={(value?: number) =>
        taxonomicLevelFilterHandler(level, value)
      }
    >
      {filtersData?.taxonomic?.data &&
        filtersData.taxonomic.data[level].map((levelElement, elementKey) => (
          <AutocompleteItem key={elementKey}>{levelElement}</AutocompleteItem>
        ))}
    </ControlledAutocomplete>
  ));
};
