import React from "react";
import {
  DendrogramDetails,
  TimeLineDetails,
  MapDetails,
  LineChartDetails,
} from "src/components/detail/GraphDetails";
import { DashboardGraphName } from "../dashboard/dashboardGraphs/DashboardGraph";

export const getGraphDetails = (graphName: string | undefined) => {
  return (
    (graphName === DashboardGraphName.DENDROGRAM && <DendrogramDetails />) ||
    (graphName === DashboardGraphName.TIMELINE && (
      <TimeLineDetails isHistogram />
    )) ||
    ((graphName === DashboardGraphName.MAP ||
      graphName === DashboardGraphName.ONGROUND) && <MapDetails />) ||
    (graphName === DashboardGraphName.LINECHART && <LineChartDetails />) || (
      <div>GRAPH NOT FOUND</div>
    )
  );
};
