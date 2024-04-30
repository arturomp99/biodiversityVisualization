import React from "react";
import { getGraphDetails } from "src/components/shared/getGraphDetails";
import { DataType } from "src/data/data.types";
import { useShowCatalogDetail } from "./Interactivtity/useShowCatalogDetail";

export type GraphDetailsProps = {
  catalogScientificNames?: DataType["scientificName"][];
  showCatalogHandler?: ReturnType<
    typeof useShowCatalogDetail
  >["showCatalogHandler"];
};

export const GraphDetails = (props: {
  graphName: string;
  detailProps: GraphDetailsProps;
}) => {
  const { graphName, detailProps } = props;

  return <>{getGraphDetails(graphName, detailProps)}</>;
};
