import * as d3 from "d3";
import { ScaleOrdinal } from "d3";
import { TimelineChartPointType } from "..";
import { getGraphMargins } from "src/utils/getGraphMargins";
import { dendrogramParameters, timeLineParameters } from "src/data/constants";
import tippy, { Instance } from "tippy.js";
import { getTimelineTooltip } from "./interactivity/TimelineTooltip";
import { timelineClassNames } from "src/data/idClassNames";

export const drawMarkers = (
  parentRef: SVGSVGElement | null,
  data: TimelineChartPointType[],
  totalHeight: number,
  colorScale?: ScaleOrdinal<string, string, never>
) => {
  const margins = getGraphMargins();
  const timelineMarkers = d3
    .select(parentRef)
    .selectAll<SVGRectElement, TimelineChartPointType>(
      `.${timelineClassNames.marker}`
    )
    .data(data, (dataPoint) => dataPoint.key);

  const timelineMarkersEnter = timelineMarkers
    .enter()
    .append("rect")
    .attr("class", timelineClassNames.marker)
    .attr("x", (dataPoint) => dataPoint.scaledX)
    .attr("y", (dataPoint) => dataPoint.scaledY)
    .attr("width", timeLineParameters.markers.width)
    .attr("rx", timeLineParameters.markers.borderRadius)
    .attr("ry", timeLineParameters.markers.borderRadius)
    // .attr("width", (dataPoint) => dataPoint.width) // TODO: Find out best way
    .attr("height", (dataPoint) => dataPoint.getHeight(totalHeight))
    .attr("fill", (dataPoint) =>
      colorScale ? colorScale(dataPoint.group) : "black"
    )
    .attr("transform", `translate(${margins.left},${margins.top})`)
    // .attr("cursor", "pointer")
    .attr("data-tippy-content", (dataPoint) =>
      getTimelineTooltip(dataPoint.tooltipContent)
    )
    .each(function () {
      tippy(this, {
        allowHTML: true,
        theme: "light",
      });
    });

  const timelineMarkersUpdate = timelineMarkers
    .transition()
    .duration(dendrogramParameters.transitions.collapseDuration)
    .attr("x", (dataPoint) => dataPoint.scaledX)
    .attr("y", (dataPoint) => dataPoint.scaledY)
    // .attr("width", (dataPoint) => dataPoint.width) // TODO: Find out best way
    .attr("height", (dataPoint) => dataPoint.getHeight(totalHeight))
    .attr("transform", `translate(${margins.left},${margins.top})`)
    .attr("fill", (dataPoint) =>
      colorScale ? colorScale(dataPoint.group) : "black"
    )
    .each(function (dataPoint) {
      (this as typeof this & { _tippy: Instance })._tippy.setContent(
        getTimelineTooltip(dataPoint.tooltipContent)
      );
    });

  timelineMarkersEnter.merge(timelineMarkersUpdate);

  timelineMarkers.exit().remove();
};
