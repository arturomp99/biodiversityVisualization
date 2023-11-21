import React from "react";
import { Dendrogram, TimeLine, Map, LineChart } from "../../graphs";

export const useGetGraph = (graphName: string) => {
  return (
    (graphName === "Dendrogram" && <Dendrogram isBasicInteractive />) ||
    (graphName === "Timeline" && <TimeLine />) ||
    (graphName === "Map" && <Map />) ||
    (graphName === "Line chart" && <LineChart />) || <div>GRAPH NOT FOUND</div>
  );
};
