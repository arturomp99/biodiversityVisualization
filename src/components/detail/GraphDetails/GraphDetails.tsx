import React from "react";
import { StyledGraphDetails } from "./styles";
import { useGetGraphDetails } from "src/components/shared/hooks/useGetGraphDetails";

export const GraphDetails = (props: { graphName: string }) => {
  const { graphName } = props;

  return (
    <StyledGraphDetails graphName={graphName}>
      {useGetGraphDetails(graphName)}
    </StyledGraphDetails>
  );
};
