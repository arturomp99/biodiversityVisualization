import { DashboardGraphName } from "../dashboardGraphs/DashboardGraph";
import {
  DashboardGraphSettingsType,
  DendrogramSettingActions,
  DendrogramSettingStates,
  SettingActions,
} from "./types";

export const getInitialSettings = (
  graphName: string | undefined
): DashboardGraphSettingsType => {
  if (graphName === DashboardGraphName.DENDROGRAM) {
    return { type: DashboardGraphName.DENDROGRAM };
  }
  return { type: undefined };
};

export const dashboardSettingsReducer = (
  prevState: DashboardGraphSettingsType,
  action: {
    type: DendrogramSettingActions | SettingActions | DendrogramSettingStates;
    value?: unknown;
  }
): DashboardGraphSettingsType => {
  switch (action.type) {
    case DendrogramSettingActions.EXPAND:
      return { ...prevState, actionFlag: DendrogramSettingActions.EXPAND };
    case DendrogramSettingActions.COLLAPSE:
      return { ...prevState, actionFlag: DendrogramSettingActions.COLLAPSE };
    case DendrogramSettingStates.LABELS_SHOWN:
      return {
        ...prevState,
        state: { labelsShown: action.value as boolean },
      };
    case SettingActions.CLEARFLAGS:
      return { ...prevState, actionFlag: undefined };
    default:
      return { ...prevState };
  }
};
