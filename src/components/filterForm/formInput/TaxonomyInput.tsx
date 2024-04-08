import React, { FC, useCallback } from "react";
import { AutocompleteItem } from "@nextui-org/react";
import { ControlledAutocomplete } from "../components/ControlledAutocomplete";
import { TaxonomicLevelsType, taxonomicLevels } from "src/data/data.types";
import { TypeOfFilter } from "src/data/filters.types";
import { FilterInputProps } from "./types";
import { FiltersDataType } from "src/components/shared/hooks/useReadData/types";

const TaxonomyInput: FC<FilterInputProps<FiltersDataType["taxonomic"]>> = ({
  filtersData,
  addFilter,
}) => {
  const taxonomicLevelFilterHandler = useCallback(
    (level: TaxonomicLevelsType, value?: number) => {
      if (!addFilter || !filtersData || !value) {
        return;
      }
      addFilter({
        level,
        value: filtersData[level][value],
        type: TypeOfFilter.Taxonomic,
      });
    },
    [addFilter, filtersData]
  );

  // Use disableSelectorIconRotation to avoid the small flickering bug
  return taxonomicLevels.map((level, levelKey) => (
    <ControlledAutocomplete
      key={levelKey}
      label={`Filter by ${level}`}
      loading={!!filtersData || false}
      onValueChanged={(value?: number) =>
        taxonomicLevelFilterHandler(level, value)
      }
    >
      {!!filtersData &&
        filtersData[level].map((levelElement, elementKey) => (
          <AutocompleteItem key={elementKey}>{levelElement}</AutocompleteItem>
        ))}
    </ControlledAutocomplete>
  ));
};

export const MemoTaxonomyInput = React.memo(TaxonomyInput);
