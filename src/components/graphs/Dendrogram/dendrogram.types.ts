import { InternMap } from "d3";
import { CleanDataFileHeaders } from "src/data/data.types";

export type TreeDataType = InternMap<
  string | string[],
  InternMap<
    string | string[],
    InternMap<
      string | string[],
      InternMap<
        string | string[],
        InternMap<
          string | string[],
          InternMap<
            string | string[],
            InternMap<
              string | string[],
              Record<CleanDataFileHeaders, string | string[]>[]
              // TODO: THIS IS HARDCODED
            >
          >
        >
      >
    >
  >
>;

// export interface DendrogramChartDataType extends TreeDataType {
//   initialPosition: Point;
// }
