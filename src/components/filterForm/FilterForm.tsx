import React from "react";
import { StyledFilterFormLayout } from "./styles";
import { Button } from "@nextui-org/react";
import { InputAccordion } from "./formInput/InputAccordion";
import { useFiltersContext } from "src/contexts/filtersContext";

export const FilterForm = () => {
  const { filters, removeAllFilters } = useFiltersContext();
  return (
    <StyledFilterFormLayout>
      <InputAccordion />
      <Button
        color="success"
        variant="solid"
        isDisabled={filters.length === 0 || !removeAllFilters}
        onPress={() => removeAllFilters && removeAllFilters()}
      >
        Clear all filters
      </Button>
    </StyledFilterFormLayout>
  );
};
