import React, { FC, useCallback, useReducer } from "react";
import { Dendrogram, Map } from "../../graphs";
import { GraphProps } from "src/components/graphs/graphsProps.types";
import { SoundChart } from "./SoundChart";
import { StyledGraphSettings } from "../dashboardGraphSettings/styles";
import { DendrorgamSettings } from "../dashboardGraphSettings/DendrogramSettings";
import { isDendrogramSettings } from "src/utils/bodyguards";
import {
  dashboardSettingsReducer,
  getInitialSettings,
} from "../dashboardGraphSettings/dashboardSettingsReducer";
import { SettingActions } from "../dashboardGraphSettings/types";
import { OnGroundChart } from "./OnGroundChart/OnGroundChart";

export enum DashboardGraphName {
  DENDROGRAM = "Dendrogram",
  TIMELINE = "Timeline",
  MAP = "Map",
  LINECHART = "LineChart",
  ONGROUND = "OnGround",
}

type DashboardGraphProps = {
  graphName: string | undefined;
  graphProps: GraphProps;
};

export const DashboardGraph: FC<DashboardGraphProps> = ({
  graphName,
  graphProps,
}) => {
  const { dimensions, isFullInteractive, showCatalogHandler } = graphProps;
  const [graphSettings, settingsDispatch] = useReducer(
    dashboardSettingsReducer,
    getInitialSettings(graphName)
  );

  const settingsActionCallback = useCallback(
    (action: SettingActions, value?: unknown) => {
      settingsDispatch({ type: action, value: value });
    },
    [settingsDispatch]
  );

  return (
    (graphName === DashboardGraphName.DENDROGRAM && (
      <>
        <Dendrogram
          isBasicInteractive
          dimensions={dimensions}
          settings={
            graphSettings && isDendrogramSettings(graphSettings)
              ? graphSettings
              : undefined
          }
          settingsActionCallback={settingsActionCallback}
        />
        <StyledGraphSettings>
          <DendrorgamSettings setSettings={settingsDispatch} />
        </StyledGraphSettings>
      </>
    )) ||
    (graphName === DashboardGraphName.ONGROUND && (
      <OnGroundChart
        isBasicInteractive
        dimensions={dimensions}
        isFullInteractive={isFullInteractive}
        showCatalogHandler={showCatalogHandler}
      />
    )) ||
    (graphName === DashboardGraphName.MAP && (
      <Map isBasicInteractive dimensions={dimensions} />
    )) ||
    (graphName === DashboardGraphName.LINECHART && (
      <SoundChart
        isBasicInteractive
        isFullInteractive={isFullInteractive}
        dimensions={dimensions}
      />
    )) || <div>GRAPH NOT FOUND</div>
  );
};
