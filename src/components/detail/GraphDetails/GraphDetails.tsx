import React from "react";
import { getGraphDetails } from "src/components/shared/getGraphDetails";

export const GraphDetails = (props: { graphName: string }) => {
  const { graphName } = props;

  return <>{getGraphDetails(graphName)}</>;
};
