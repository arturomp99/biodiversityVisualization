import { barChartParameters } from "src/data/constants";
import { getGraphMargins } from "src/utils/getGraphMargins";

export const getBarChartHeight = (
  rowsCount: number,
  customMargins?: Parameters<typeof getGraphMargins>[0]
) => {
  const margins = getGraphMargins(customMargins);
  const realHeight =
    rowsCount * (barChartParameters.barWidth + barChartParameters.barsGap);
  const totalHeight = realHeight + margins.top + margins.bottom;
  return { realHeight, totalHeight };
};
