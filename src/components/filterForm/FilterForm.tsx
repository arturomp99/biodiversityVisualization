import React from "react";
import { StyledFilterFormLayout } from "./styles";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { inputElementsData } from "./InputElementsData";
import { useFiltersContext } from "src/contexts/filtersContext";

export const FilterForm = () => {
  const { filters, removeAllFilters } = useFiltersContext();
  return (
    <StyledFilterFormLayout>
      <Accordion
        selectionMode="multiple"
        isCompact="true"
        itemClasses={{ content: "flex flex-col gap-1" }}
      >
        {inputElementsData.map((inputElement, key) => (
          <AccordionItem
            key={key}
            aria-label={inputElement.title}
            title={inputElement.title}
          >
            {inputElement.element}
          </AccordionItem>
        ))}
      </Accordion>
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
