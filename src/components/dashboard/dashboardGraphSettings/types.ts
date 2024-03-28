import { DashboardGraphName } from "../dashboardGraphs/DashboardGraph";

type DashboardGraphSettingsBaseType = {
  type: DashboardGraphName | undefined;
};

export enum DendrogramSettingActions {
  EXPAND = "expandAll",
  COLLAPSE = "collapseAll",
}
export enum DendrogramSettingStates {
  LABELS_SHOWN = "labelsShown",
}

export enum SettingActions {
  CLEARFLAGS = "clearFlags",
}

export type DendrogramSettingsType = DashboardGraphSettingsBaseType & {
  actionFlag?: DendrogramSettingActions;
  state?: Record<DendrogramSettingStates, boolean>;
};

export type DashboardGraphSettingsType = DendrogramSettingsType;
