import React from "react";
import { StyledFooter } from "./styles";
import { GraphMetadataType } from "../../../../data/graphs.types";

export const CardFooter = ({ graphData }: { graphData: GraphMetadataType }) => {
  return (
    <StyledFooter>
      <p>{graphData.title}</p>
      <p>{graphData.description}</p>
    </StyledFooter>
  );
};
