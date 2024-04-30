import React from "react";
import { StyledDetailChart } from "../styles";
import { HeatTreeSection } from "./HeatTreeSection/HeatTreeSection";
import { SpeciesRichness } from "./SpeciesRichness/SpeciesRichness";
import { SpeciesPerTaxon } from "./SpeciesPerTaxon/SpeciesPerTaxon";

export const DendrogramDetails = () => {
  return (
    <>
      <StyledDetailChart $marginTop="3rem">
        <HeatTreeSection />
      </StyledDetailChart>
      <SpeciesRichness />
      <SpeciesPerTaxon />
    </>
  );
};
