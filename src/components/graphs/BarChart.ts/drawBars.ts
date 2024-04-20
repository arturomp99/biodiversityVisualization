import * as d3 from "d3";
import { getGraphMargins } from "src/utils/getGraphMargins";
import { BarChartPointType } from "..";
import { barChartClassNames } from "src/data/idClassNames";
import { barChartParameters } from "src/data/constants";

export const drawBars = (
  parentRef: SVGSVGElement | null,
  data: BarChartPointType[],
  customMargins?: Parameters<typeof getGraphMargins>[0]
) => {
  const margins = getGraphMargins(customMargins);
  const bars = d3
    .select(parentRef)
    .selectAll<SVGRectElement, BarChartPointType>(`.${barChartClassNames.rect}`)
    .data(data)
    .attr("transform", `translate(${margins.left},${margins.top})`);

  const barsEnter = bars
    .enter()
    .append("rect")
    .attr("class", barChartClassNames.rect)
    .attr(
      "x",
      (dataPoint) =>
        (dataPoint.scaledX ?? 0) +
        ((barChartParameters.barsGapFactor - 1) / 2) *
          (dataPoint.scaledWidth ?? 0)
    )
    .attr("y", (dataPoint) => dataPoint.scaledY ?? 0)
    .attr("height", (dataPoint) => dataPoint.scaledHeight ?? 0)
    .attr("width", (dataPoint) => dataPoint.scaledWidth ?? 0)
    .attr("fill", "black");

  const barsUpdate = bars
    .attr(
      "x",
      (dataPoint) =>
        (dataPoint.scaledX ?? 0) +
        ((barChartParameters.barsGapFactor - 1) / 2) *
          (dataPoint.scaledWidth ?? 0)
    )
    .attr("y", (dataPoint) => dataPoint.scaledY ?? 0)
    .attr("height", (dataPoint) => dataPoint.scaledHeight ?? 0)
    .attr("width", (dataPoint) => dataPoint.scaledWidth ?? 0)
    .attr("transform", `translate(${margins.left},${margins.top})`);

  barsEnter.merge(barsUpdate);

  bars.exit().remove();
};
