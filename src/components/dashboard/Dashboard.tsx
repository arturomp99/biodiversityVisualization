import React from "react";
import { StyledDashboardLayout } from "./styles";
import { graphsMetadata } from "../../data";
import { GraphMetadataType } from "../../data/graphs.types";
import { Graph } from "../shared/containers/Card";

export const Dashboard = () => {
  return (
    <StyledDashboardLayout>
      {graphsMetadata.data.map((elementGraph: GraphMetadataType, i: number) => {
        return (
          <Graph
            key={i}
            graphName={elementGraph.id}
            to={`../Detail/${elementGraph.id}`}
          />
        );
      })}
    </StyledDashboardLayout>
  );
};
