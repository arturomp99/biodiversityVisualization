import React from "react";
import { StyledFooter } from "./styles";
import { GraphDataType } from "../../../../data/graphs.types";

export const CardFooter = ({ graphData }: { graphData: GraphDataType }) => {
  return (
    <StyledFooter>
      <p>{graphData.title}</p>
      <p>{graphData.description}</p>
    </StyledFooter>
  );
};
