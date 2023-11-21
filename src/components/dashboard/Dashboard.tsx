import React from "react";

import { StyledDashboardLayout } from "./styles";
import { graphsMetadata } from "../../data";
import { GraphMetadataType } from "../../data/graphs.types";
import { useGetGraph } from "../shared/hooks/useGetGraph";
import { GraphContainer, GraphCard } from "../shared/containers/Card";

export const Dashboard = () => {
  return (
    <StyledDashboardLayout>
      {graphsMetadata.data.map((elementGraph: GraphMetadataType, i: number) => {
        return (
          <GraphCard key={i}>
            <GraphContainer>{useGetGraph(elementGraph.title)}</GraphContainer>
          </GraphCard>
        );
      })}
    </StyledDashboardLayout>
  );
};
