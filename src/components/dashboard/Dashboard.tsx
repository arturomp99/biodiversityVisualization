import React from "react";
import { StyledDashboardGraph, StyledDashboardLayout } from "./styles";
import { graphsMetadata } from "../../data";
import { GraphMetadataType } from "../../data/graphs.types";
import { Graph } from "../shared/containers/Card";
import { DashboardGraphName } from "./dashboardGraphs/DashboardGraph";
import { TimeLineGraph } from "../graphs/TimeLine/TimeLineGraph";

export const Dashboard = () => {
  return (
    <StyledDashboardLayout>
      {graphsMetadata.data.map(
        (elementGraph: GraphMetadataType, index: number) => {
          return (
            <StyledDashboardGraph $graphId={elementGraph.id} key={index}>
              {elementGraph.id === DashboardGraphName.TIMELINE ? (
                <TimeLineGraph
                  title={elementGraph.title}
                  to={`../Detail/${elementGraph.id}`}
                  info={elementGraph.description}
                />
              ) : (
                <Graph
                  graphName={elementGraph.id}
                  title={elementGraph.title}
                  to={`../Detail/${elementGraph.id}`}
                  info={elementGraph.description}
                />
              )}
            </StyledDashboardGraph>
          );
        }
      )}
    </StyledDashboardLayout>
  );
};
