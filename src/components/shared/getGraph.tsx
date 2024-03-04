import React from "react";
import { Dendrogram, TimeLine, Map, LineChart } from "../graphs";
import { GraphProps } from "src/components/graphs/graphs.types";

export const getGraph = (
  graphName: string | undefined,
  graphProps: GraphProps
) => {
  const { dimensions } = graphProps;
  return (
    (graphName === "Dendrogram" && (
      <Dendrogram isBasicInteractive dimensions={dimensions} />
    )) ||
    (graphName === "Timeline" && <TimeLine dimensions={dimensions} />) ||
    (graphName === "Map" && (
      <Map isBasicInteractive dimensions={dimensions} />
    )) ||
    (graphName === "LineChart" && (
      <LineChart isBasicInteractive dimensions={dimensions} />
    )) || <div>GRAPH NOT FOUND</div>
  );
};
