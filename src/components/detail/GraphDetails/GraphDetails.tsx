import React from "react";
import { StyledGraphDetails } from "./styles";
import { getGraphDetails } from "src/components/shared/getGraphDetails";

export const GraphDetails = (props: { graphName: string }) => {
  const { graphName } = props;

  return (
    <StyledGraphDetails graphName={graphName}>
      {getGraphDetails(graphName)}
    </StyledGraphDetails>
  );
};
