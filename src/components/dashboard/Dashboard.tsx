import React from "react";

import { DashboardLayout } from "./styles";
import { graphs } from "../../data";
import { GraphDataType } from "../../data/graphs.types";
import { useGetGraph } from "./useGetGraph";
import {
  GraphContainer,
  CardFooter,
  StyledGraphCard,
} from "../shared/containers/Card";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      {graphs.data.map((elementGraph: GraphDataType, i: number) => {
        return (
          <StyledGraphCard key={i}>
            <GraphContainer>{useGetGraph(elementGraph.title)}</GraphContainer>
            <CardFooter graphData={elementGraph} />
          </StyledGraphCard>
        );
      })}
    </DashboardLayout>
  );
};
