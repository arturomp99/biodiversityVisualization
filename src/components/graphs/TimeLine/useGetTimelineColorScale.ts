import { useEffect, useState } from "react";
import { scaleOrdinal } from "d3";
import { uniq } from "lodash";
import type { ScaleOrdinal } from "d3";
import { timeLineParameters } from "src/data/constants";
import { TimelineChartDataType } from "../graphsData.types";
import { LegendFilterType } from "./TimeLineGraph";

export const useGetTimelineColorScale = (
  data: TimelineChartDataType[] | undefined,
  colorScaleFilter: LegendFilterType
) => {
  const [{ colorScale, keys }, setColorScale] = useState<{
    colorScale: ScaleOrdinal<string, string, never> | undefined;
    keys: string[] | undefined;
  }>({ colorScale: undefined, keys: undefined });

  useEffect(
    () =>
      setColorScale((previousColorScale) => {
        if (!data) {
          return previousColorScale;
        }

        const colorScaleKeys = uniq(
          data.map((dataRow) => dataRow[colorScaleFilter] as string)
        );

        return {
          colorScale: scaleOrdinal<string>()
            .domain(colorScaleKeys)
            .range(timeLineParameters.colorScheme),
          keys: colorScaleKeys,
        };
      }),
    [data, colorScaleFilter]
  );

  return { colorScale, keys };
};
