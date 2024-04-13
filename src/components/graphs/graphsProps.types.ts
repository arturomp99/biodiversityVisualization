import { lineChartParameters } from "src/data/constants";
import {
  DendrogramSettingsType,
  SettingActions,
} from "../dashboard/dashboardGraphSettings/types";
import {
  BarChartDataType,
  HistogramDataType,
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
  axesParameters?: typeof lineChartParameters.axesParameters;
  axisTitles?: [string, string];
  shouldAddLegend?: boolean;
};

export type BarChartProps = GraphProps & {
  data: BarChartDataType[];
};

export type StackedBarChartProps = GraphProps & {
  data: StackedBarChartDataType[];
  onBarClick: (id?: string) => void;
};

export type HistogramProps<T> = GraphProps & {
  data: HistogramDataType<T>[];
  xExtent?: [Date, Date];
  onHover?: (hovered: string[]) => void;
};
