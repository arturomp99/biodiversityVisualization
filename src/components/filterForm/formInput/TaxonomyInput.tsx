import React, { FC, useCallback } from "react";
import { AutocompleteItem } from "@nextui-org/react";
import { ControlledAutocomplete } from "../components/ControlledAutocomplete";
import { TaxonomicLevelsType } from "src/data/data.types";
import { TypeOfFilter } from "src/data/filters.types";
import {
  TaxonomicFiltersDataType,
  taxonomicLevels,
} from "src/components/shared/hooks/useGetFiltersData/asyncGetTaxonomicFiltersData";
import { FilterInputProps } from "./types";

const TaxonomyInput: FC<FilterInputProps<TaxonomicFiltersDataType>> = ({
  filtersData,
  addFilter,
}) => {
  const taxonomicLevelFilterHandler = useCallback(
    (level: TaxonomicLevelsType, value?: number) => {
      if (!addFilter || !filtersData?.data || !value) {
        return;
      }
      addFilter({
        level,
        value: filtersData.data[level][value],
        type: TypeOfFilter.Taxonomic,
      });
    },
    [addFilter, filtersData?.data]
  );

  // Use disableSelectorIconRotation to avoid the small flickering bug
  return taxonomicLevels.map((level, levelKey) => (
    <ControlledAutocomplete
      key={levelKey}
      label={`Filter by ${level}`}
      loading={filtersData?.loading || false}
      onValueChanged={(value?: number) =>
        taxonomicLevelFilterHandler(level, value)
      }
    >
      {filtersData?.data &&
        filtersData.data[level].map((levelElement, elementKey) => (
          <AutocompleteItem key={elementKey}>{levelElement}</AutocompleteItem>
        ))}
    </ControlledAutocomplete>
  ));
};

export const MemoTaxonomyInput = React.memo(TaxonomyInput);
