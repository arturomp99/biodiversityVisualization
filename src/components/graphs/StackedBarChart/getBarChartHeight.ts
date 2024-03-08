import { barChartParameters, graphMargin } from "src/data/constants";

export const getBarChartHeight = (rowsCount: number) => {
  const realHeight =
    rowsCount * (barChartParameters.barWidth + barChartParameters.barsGap);
  const totalHeight = realHeight + graphMargin.top + graphMargin.bottom;
  return { realHeight, totalHeight };
};
