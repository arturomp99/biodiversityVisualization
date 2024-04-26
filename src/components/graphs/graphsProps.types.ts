import { graphMargin, lineChartParameters } from "src/data/constants";
import {
  DendrogramSettingsType,
  SettingActions,
} from "../dashboard/dashboardGraphSettings/types";
import {
  BarChartDataType,
  HistogramDataType,
  LineChartDataType,
  NumericHistogramDataType,
  StackedBarChartDataType,
} from "./graphsData.types";
import { useShowCatalogDetail } from "../detail/GraphDetails/Interactivtity/useShowCatalogDetail";
import { ScaleOrdinal } from "d3";

export interface GraphProps {
  dimensions: [number, number];
  isBasicInteractive?: boolean;
  isFullInteractive?: boolean;
  settingsActionCallback?: (action: SettingActions) => void;
  showCatalogHandler?: ReturnType<
    typeof useShowCatalogDetail
  >["showCatalogHandler"];
  customMargin?: Partial<typeof graphMargin>;
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
  isXLabelDiagonal?: boolean;
  isLog?: boolean;
};

export type StackedBarChartProps = GraphProps & {
  data: StackedBarChartDataType[];
  onBarClick: (id?: string) => void;
};

export type HistogramProps<T> = GraphProps & {
  data: HistogramDataType<T>[];
  xExtent?: [Date, Date];
  onHover?: (hovered: string[]) => void;
  reducerFunction?: (dataPoint: HistogramDataType<T>[]) => number;
  stackFunction?: (dataPoint: HistogramDataType<T>) => string;
  colorScale?: ScaleOrdinal<string, string, never> | undefined;
};

export type NumericHistogramProps<T> = GraphProps & {
  data: NumericHistogramDataType<T>[];
  xExtent?: [number, number];
  onHover?: (hovered: string[]) => void;
  binFunction: (dataPoint: NumericHistogramDataType<T>) => number;
  reducerFunction?: (dataPoint: NumericHistogramDataType<T>[]) => number;
  stackFunction?: (dataPoint: NumericHistogramDataType<T>) => string;
  colorScale?: ScaleOrdinal<string, string, never> | undefined;
};
