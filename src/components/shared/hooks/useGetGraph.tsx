import React from "react";
import { Dendrogram, TimeLine, Map, LineChart } from "../../graphs";
import { GraphProps } from "src/components/graphs/graphs.types";

export const useGetGraph = (
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
    (graphName === "LineChart" && <LineChart dimensions={dimensions} />) || (
      <div>GRAPH NOT FOUND</div>
    )
  );
};
