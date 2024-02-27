import React from "react";
import { StyledFilterFormLayout } from "./styles";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { inputElementsData } from "./InputElementsData";

export const FilterForm = () => {
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
    </StyledFilterFormLayout>
  );
};
