import React from "react";
import {
  DendrogramDetails,
  TimeLineDetails,
  MapDetails,
  LineChartDetails,
} from "src/components/detail/GraphDetails";
import { DashboardGraphName } from "../dashboard/dashboardGraphs/DashboardGraph";
import { GraphDetailsProps } from "../detail/GraphDetails/GraphDetails";

export const getGraphDetails = (
  graphName: string | undefined,
  detailProps: GraphDetailsProps
) => {
  return (
    (graphName === DashboardGraphName.DENDROGRAM && (
      <DendrogramDetails
        showCatalogHandler={detailProps.showCatalogHandler}
        catalogScientificNames={detailProps.catalogScientificNames}
      />
    )) ||
    (graphName === DashboardGraphName.TIMELINE && (
      <TimeLineDetails
        isHistogram
        showCatalogHandler={detailProps.showCatalogHandler}
        catalogScientificNames={detailProps.catalogScientificNames}
      />
    )) ||
    ((graphName === DashboardGraphName.MAP ||
      graphName === DashboardGraphName.ONGROUND) && (
      <MapDetails
        catalogScientificNames={detailProps.catalogScientificNames}
        showCatalogHandler={detailProps.showCatalogHandler}
      />
    )) ||
    (graphName === DashboardGraphName.LINECHART && <LineChartDetails />) || (
      <div>GRAPH NOT FOUND</div>
    )
  );
};
