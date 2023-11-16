import React from "react";

import { StyledDashboardLayout } from "./styles";
import { graphsMetadata } from "../../data";
import { GraphMetadataType } from "../../data/graphs.types";
import { useGetGraph } from "../shared/hooks/useGetGraph";
import {
  GraphContainer,
  CardFooter,
  StyledGraphCard,
} from "../shared/containers/Card";

export const Dashboard = () => {
  return (
    <StyledDashboardLayout>
      {graphsMetadata.data.map((elementGraph: GraphMetadataType, i: number) => {
        return (
          <StyledGraphCard key={i}>
            <GraphContainer>{useGetGraph(elementGraph.title)}</GraphContainer>
            <CardFooter graphData={elementGraph} />
          </StyledGraphCard>
        );
      })}
    </StyledDashboardLayout>
  );
};
