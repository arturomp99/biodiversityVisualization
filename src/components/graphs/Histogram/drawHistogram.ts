import * as d3 from "d3";
import { HistogramPointType } from "..";
import { histogramClassNames } from "src/data/idClassNames";
import { getGraphMargins } from "src/utils/getGraphMargins";
import { ScaleOrdinal } from "d3";
import { dendrogramParameters, histogramParameters } from "src/data/constants";
import { addTooltiptToSelection } from "../shared/addTooltip";
import { Instance } from "tippy.js";

export const drawHistogram = (
  parentRef: SVGSVGElement | null,
  data: HistogramPointType[],
  colorScale?: ScaleOrdinal<string, string, never>,
  tooltipContentGenerator?: (dataPoint: HistogramPointType) => string
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
    .attr("y", (dataPoint) => dataPoint.scaledY0)
    .attr("height", 0)
    .attr(
      "width",
      (dataPoint) => (dataPoint.scaledX1 ?? 0) - (dataPoint.scaledX0 ?? 0) || 10
    )
    .attr("transform", `translate(${margins.left},${margins.top})`)
    .attr("stroke", "white")
    .attr("fill", (dataPoint) =>
      dataPoint.group && colorScale
        ? colorScale(dataPoint.group)
        : histogramParameters.stacked.colorScheme[0]
    );

  barsEnter
    .transition()
    .duration(dendrogramParameters.transitions.collapseDuration)
    .attr("y", (dataPoint) => dataPoint.scaledY1)
    .attr("height", (dataPoint) => dataPoint.scaledY0 - dataPoint.scaledY1);

  addTooltiptToSelection<SVGRectElement, (typeof data)[0]>(
    barsEnter,
    tooltipContentGenerator
      ? tooltipContentGenerator
      : (dataPoint) => {
          return `${dataPoint.value} observations`;
        }
  );

  const barsUpdate = bars
    .attr("fill", (dataPoint) =>
      dataPoint.group && colorScale
        ? colorScale(dataPoint.group)
        : histogramParameters.stacked.colorScheme[0]
    )
    .each(function (dataPoint) {
      (this as typeof this & { _tippy: Instance })._tippy.setContent(
        tooltipContentGenerator
          ? tooltipContentGenerator(dataPoint)
          : `${dataPoint.value} observations`
      );
    })
    .transition()
    .duration(dendrogramParameters.transitions.collapseDuration)
    .attr("x", (dataPoint) =>
      (dataPoint.scaledX1 ?? 0) - (dataPoint.scaledX0 ?? 0) > 0
        ? dataPoint.scaledX0
        : (dataPoint.scaledX0 ?? 0) - 5
    )
    .attr(
      "width",
      (dataPoint) => (dataPoint.scaledX1 ?? 0) - (dataPoint.scaledX0 ?? 0) || 10
    )
    .attr("y", (dataPoint) => dataPoint.scaledY1)
    .attr("height", (dataPoint) => dataPoint.scaledY0 - dataPoint.scaledY1);

  barsEnter.merge(barsUpdate);
  bars.exit().remove();
};
