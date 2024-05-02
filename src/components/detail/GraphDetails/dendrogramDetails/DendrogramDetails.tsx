import React, { useRef, useEffect } from "react";
import { StyledDetailChart } from "../styles";
import { HeatTreeSection } from "./HeatTreeSection/HeatTreeSection";
import { SpeciesEvenness } from "./SpeciesEvenness/SpeciesEvenness";
import { SpeciesPerTaxon } from "./SpeciesPerTaxon/SpeciesPerTaxon";
import type { GraphDetailsProps } from "../GraphDetails";
import type { DataType } from "src/data/data.types";
import { StyledDivider, StyledTitle } from "../MapDetails/styles";
import { Catalog } from "src/components/catalog/Catalog";

export const DendrogramDetails = ({
  showCatalogHandler,
  catalogScientificNames,
}: {
  showCatalogHandler?: GraphDetailsProps["showCatalogHandler"];
  catalogScientificNames?: DataType["scientificName"][];
}) => {
  const catalogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [catalogScientificNames]);

  return (
    <>
      <StyledDetailChart $marginTop="3rem">
        <HeatTreeSection />
      </StyledDetailChart>
      <SpeciesEvenness showCatalogHandler={showCatalogHandler} />
      <SpeciesPerTaxon />
      {catalogScientificNames && (
        <div ref={catalogRef}>
          <StyledDivider />
          <StyledTitle>Catalog of observations</StyledTitle>
          <Catalog catalogScientificNames={catalogScientificNames} />
        </div>
      )}
    </>
  );
};
