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
  isIdentificationMethodFilterType,
  isLocationFilterType,
  isTemporalFilterType,
} from "src/utils/bodyguards";
import {
  ConfidenceFilterType,
  DropFilterType,
  LocationFilterType,
  TemporalFilterType,
  IdentificationMethodFilterType,
} from "src/data/filters.types";
import { MemoConfidenceInput } from "./ConfidenceInput";
import { MemoLocationInput } from "./LocationInput";
import { MemoMethodInput } from "./MethodInput";
import { GraphInfo } from "src/components/dashboard/GraphInfo";

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
      <AccordionItem aria-label="Location" title={"Location"}>
        <MemoLocationInput
          filtersData={filtersData?.location}
          addFilter={addFilter}
          removeFilter={removeFilter}
          selectedFilters={
            filters.filter((filter) =>
              isLocationFilterType(filter)
            ) as LocationFilterType[]
          }
        />
      </AccordionItem>
      <AccordionItem
        aria-label="Identification method"
        title={"Identification method"}
      >
        <MemoMethodInput
          filtersData={filtersData?.identificationMethod}
          addFilter={addFilter}
          removeFilter={removeFilter}
          selectedFilters={
            filters.filter((filter) =>
              isIdentificationMethodFilterType(filter)
            ) as IdentificationMethodFilterType[]
          }
        />
      </AccordionItem>
      <AccordionItem
        aria-label="DROP"
        title={
          <div className="flex flex-row gap-1">
            <p>DROP</p>
            <GraphInfo
              info="Deep-Rainforest Observation Platform is an autonomous system of sensors and sampling tools developed by Providence+ team and used to pick data"
              align="center"
            />
          </div>
        }
      >
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
