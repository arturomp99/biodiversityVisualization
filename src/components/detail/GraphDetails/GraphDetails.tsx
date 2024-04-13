import React from "react";
import { getGraphDetails } from "src/components/shared/getGraphDetails";
import { DataType } from "src/data/data.types";

export type GraphDetailsProps = {
  catalogScientificNames?: DataType["scientificName"][];
};

export const GraphDetails = (props: {
  graphName: string;
  detailProps: GraphDetailsProps;
}) => {
  const { graphName, detailProps } = props;

  return <>{getGraphDetails(graphName, detailProps)}</>;
};
