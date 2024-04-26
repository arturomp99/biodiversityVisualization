import * as d3 from "d3";
import { HistogramPointType } from "..";
import { histogramClassNames } from "src/data/idClassNames";
import { getGraphMargins } from "src/utils/getGraphMargins";
import { ScaleOrdinal } from "d3";
import { histogramParameters } from "src/data/constants";

export const drawHistogram = (
  parentRef: SVGSVGElement | null,
  data: HistogramPointType[],
  colorScale?: ScaleOrdinal<string, string, never>
) => {
  const margins = getGraphMargins();
  const bars = d3
    .select(parentRef)
    .selectAll<SVGRectElement, typeof data>(`.${histogramClassNames.bar}`)
    .data(data);

  const barsEnter = bars
    .enter()
    .append("rect")
    .attr("class", histogramClassNames.bar)
    .attr("x", (dataPoint) => dataPoint.scaledX0)
    .attr("y", (dataPoint) => dataPoint.scaledY1)
    .attr(
      "width",
      (dataPoint) => (dataPoint.scaledX1 ?? 0) - (dataPoint.scaledX0 ?? 0) || 10
    )
    .attr("height", (dataPoint) => dataPoint.scaledY0 - dataPoint.scaledY1)
    .attr("transform", `translate(${margins.left},${margins.top})`)
    .attr("stroke", "white")
    .attr("fill", (dataPoint) =>
      dataPoint.group && colorScale
        ? colorScale(dataPoint.group)
        : histogramParameters.stacked.colorScheme[0]
    );

  const barsUpdate = bars
    .attr("x", (dataPoint) =>
      (dataPoint.scaledX1 ?? 0) - (dataPoint.scaledX0 ?? 0) > 0
        ? dataPoint.scaledX0
        : (dataPoint.scaledX0 ?? 0) - 5
    )
    .attr("y", (dataPoint) => dataPoint.scaledY1)
    .attr(
      "width",
      (dataPoint) => (dataPoint.scaledX1 ?? 0) - (dataPoint.scaledX0 ?? 0) || 10
    )
    .attr("height", (dataPoint) => dataPoint.scaledY0 - dataPoint.scaledY1)
    .attr("fill", (dataPoint) =>
      dataPoint.group && colorScale
        ? colorScale(dataPoint.group)
        : histogramParameters.stacked.colorScheme[0]
    );

  barsEnter.merge(barsUpdate);
  bars.exit().remove();
};
