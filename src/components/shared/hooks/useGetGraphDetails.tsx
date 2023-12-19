import React from "react";
import {
  DendrogramDetails,
  TimeLineDetails,
  MapDetails,
  LineChartDetails,
} from "src/components/detail/GraphDetails";

export const useGetGraphDetails = (graphName: string | undefined) => {
  return (
    (graphName === "Dendrogram" && <DendrogramDetails />) ||
    (graphName === "Timeline" && <TimeLineDetails />) ||
    (graphName === "Map" && <MapDetails />) ||
    (graphName === "LineChart" && <LineChartDetails />) || (
      <div>GRAPH NOT FOUND</div>
    )
  );
};
