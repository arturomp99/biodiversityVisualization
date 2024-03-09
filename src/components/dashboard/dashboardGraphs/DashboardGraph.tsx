import React, { FC } from "react";
import { Dendrogram, TimeLine, Map } from "../../graphs";
import { GraphProps } from "src/components/graphs/graphsProps.types";
import { SoundChart } from "./SoundChart";

type DashboardGraphProps = {
  graphName: string | undefined;
  graphProps: GraphProps;
};

export const DashboardGraph: FC<DashboardGraphProps> = ({
  graphName,
  graphProps,
}) => {
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
      <SoundChart isBasicInteractive dimensions={dimensions} />
    )) || <div>GRAPH NOT FOUND</div>
  );
};
