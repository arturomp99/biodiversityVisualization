import React from "react";
import { Dendrogram, TimeLine, Map, LineChart } from "../../graphs";

export const useGetGraph = (graphName: string | undefined) => {
  return (
    (graphName === "Dendrogram" && <Dendrogram isBasicInteractive />) ||
    (graphName === "Timeline" && <TimeLine />) ||
    (graphName === "Map" && <Map isBasicInteractive />) ||
    (graphName === "LineChart" && <LineChart />) || <div>GRAPH NOT FOUND</div>
  );
};
