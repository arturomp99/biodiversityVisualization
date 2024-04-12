import React from "react";
import {
  DendrogramDetails,
  TimeLineDetails,
  MapDetails,
  LineChartDetails,
} from "src/components/detail/GraphDetails";
import { DashboardGraphName } from "../dashboard/dashboardGraphs/DashboardGraph";
import { GraphDetailsProps } from "../detail/GraphDetails/GraphDetails";
import { isPositionFilterType } from "src/utils/bodyguards";

export const getGraphDetails = (
  graphName: string | undefined,
  detailProps: GraphDetailsProps
) => {
  const catalogFilter =
    detailProps.catalogFilter && isPositionFilterType(detailProps.catalogFilter)
      ? detailProps.catalogFilter
      : undefined;
  return (
    (graphName === DashboardGraphName.DENDROGRAM && <DendrogramDetails />) ||
    (graphName === DashboardGraphName.TIMELINE && (
      <TimeLineDetails isHistogram />
    )) ||
    ((graphName === DashboardGraphName.MAP ||
      graphName === DashboardGraphName.ONGROUND) && (
      <MapDetails catalogFilter={catalogFilter} />
    )) ||
    (graphName === DashboardGraphName.LINECHART && <LineChartDetails />) || (
      <div>GRAPH NOT FOUND</div>
    )
  );
};
