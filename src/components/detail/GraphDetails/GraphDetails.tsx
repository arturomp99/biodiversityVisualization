import React from "react";
import { getGraphDetails } from "src/components/shared/getGraphDetails";
import { FiltersType } from "src/data/filters.types";

export type GraphDetailsProps = {
  catalogFilter?: FiltersType;
};

export const GraphDetails = (props: {
  graphName: string;
  detailProps: GraphDetailsProps;
}) => {
  const { graphName, detailProps } = props;

  return <>{getGraphDetails(graphName, detailProps)}</>;
};
