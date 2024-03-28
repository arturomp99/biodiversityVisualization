import {
  DendrogramSettingsType,
  SettingActions,
} from "../dashboard/dashboardGraphSettings/types";
import {
  BarChartDataType,
  LineChartDataType,
  StackedBarChartDataType,
} from "./graphsData.types";

export interface GraphProps {
  dimensions: [number, number];
  isBasicInteractive?: boolean;
  isFullInteractive?: boolean;
}

export type DendrogramProps = GraphProps & {
  settings: DendrogramSettingsType | undefined;
  settingsActionCallback: (action: SettingActions) => void;
};

export type LineChartProps = GraphProps & {
  data: LineChartDataType[];
  isBrushInteractive?: boolean;
  isCursorInteractive?: boolean;
};

export type BarChartProps = GraphProps & {
  data: BarChartDataType[];
};

export type StackedBarChartProps = GraphProps & {
  data: StackedBarChartDataType[];
  onBarClick: (id?: string) => void;
};
