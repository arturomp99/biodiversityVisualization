import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useDataContext } from "src/contexts/dataContext";
import { taxonomicLevels } from "src/components/shared/hooks/useGetFiltersData";

export const TaxonomyInput = () => {
  const { filtersData: taxonomicFiltersData } = useDataContext();
  console.log(taxonomicFiltersData);

  // Use disableSelectorIconRotation to avoid the small flickering bug
  return taxonomicLevels.map((level, levelKey) => (
    <Autocomplete
      key={levelKey}
      label={`Filter by ${level}`}
      variant="bordered"
      disableSelectorIconRotation
      isLoading={taxonomicFiltersData.loading}
    >
      {taxonomicFiltersData.data &&
        taxonomicFiltersData.data[level].map((levelElement, elementKey) => (
          <AutocompleteItem key={elementKey}>{levelElement}</AutocompleteItem>
        ))}
    </Autocomplete>
  ));
};
