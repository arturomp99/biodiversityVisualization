import React from "react";

import { MemoTaxonomyInput } from "./TaxonomyInput";
import { MemoTimeRangeInput } from "./TimeRangeInput";
import { MemoDropInput } from "./DropInput";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { useDataContext } from "src/contexts/dataContext";
import { useFiltersContext } from "src/contexts/filtersContext";
import {
  isConfidenceFilterType,
  isDropFilterType,
  isTemporalFilterType,
} from "src/utils/bodyguards";
import {
  ConfidenceFilterType,
  DropFilterType,
  TemporalFilterType,
} from "src/data/filters.types";
import { MemoConfidenceInput } from "./ConfidenceInput";

export const InputAccordion = () => {
  const { filtersData } = useDataContext();
  const { filters, addFilter, removeFilter } = useFiltersContext();

  return (
    <Accordion
      selectionMode="multiple"
      isCompact={true}
      itemClasses={{ content: "flex flex-col gap-1" }}
    >
      <AccordionItem aria-label="Taxonomy" title={"Taxonomy"}>
        <MemoTaxonomyInput
          filtersData={filtersData?.taxonomic}
          addFilter={addFilter}
        />
      </AccordionItem>
      <AccordionItem aria-label="Time Range" title={"Time Range"}>
        <MemoTimeRangeInput
          filtersData={filtersData?.temporal}
          addFilter={addFilter}
          selectedFilters={
            filters.filter((filter) =>
              isTemporalFilterType(filter)
            ) as TemporalFilterType[]
          }
        />
      </AccordionItem>
      <AccordionItem aria-label="DROP" title={"DROP"}>
        <MemoDropInput
          filtersData={filtersData?.drop}
          addFilter={addFilter}
          removeFilter={removeFilter}
          selectedFilters={
            filters.filter((filter) =>
              isDropFilterType(filter)
            ) as DropFilterType[]
          }
        />
      </AccordionItem>
      <AccordionItem aria-label="Confidence %" title={"Confidence %"}>
        <MemoConfidenceInput
          addFilter={addFilter}
          selectedFilters={
            filters.filter((filter) =>
              isConfidenceFilterType(filter)
            ) as ConfidenceFilterType[]
          }
        />
      </AccordionItem>
    </Accordion>
  );
};
