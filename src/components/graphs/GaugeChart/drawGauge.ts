import * as d3 from "d3";
import { GaugePointType } from "../graphsPoints.types";
import { gaugeClassNames } from "src/data/idClassNames";
import { dendrogramParameters, gaugeChartParameters } from "src/data/constants";

export const drawGauge = (
  parentRef: SVGSVGElement | null,
  data: GaugePointType,
  height: number
) => {
  const gaugeMarkers = d3
    .select(parentRef)
    .selectAll<SVGRectElement, GaugePointType>(`.${gaugeClassNames.marker}`)
    .data([data])
    .attr(
      "transform",
      `translate(,${(height + gaugeChartParameters.barWidth / 2) / 2})`
    );

  const gaugeMarkersEnter = gaugeMarkers
    .enter()
    .append("g")
    .attr("class", gaugeClassNames.marker);

  gaugeMarkersEnter
    .append("rect")
    .attr("class", gaugeClassNames.markerBackground)
    .attr("height", "16px")
    .attr("x", (dataPoint) => dataPoint.scaledX0)
    .attr("width", (dataPoint) => dataPoint.scaledX100 - dataPoint.scaledX0)
    .attr("fill", "black")
    .attr("opacity", 0.4);

  gaugeMarkersEnter
    .append("rect")
    .attr("class", gaugeClassNames.markerIndicator)
    .attr("height", gaugeChartParameters.barWidth)
    .attr("x", (dataPoint) => dataPoint.scaledX0)
    .attr("width", (dataPoint) => dataPoint.scaledX1 - dataPoint.scaledX0)
    .attr("fill", "#17c964");

  gaugeMarkers
    .select(`.${gaugeClassNames.markerBackground}`)
    .attr("x", (dataPoint) => dataPoint.scaledX0)
    .attr("width", (dataPoint) => dataPoint.scaledX100 - dataPoint.scaledX0);

  gaugeMarkers
    .select(`.${gaugeClassNames.markerIndicator}`)
    .transition()
    .duration(dendrogramParameters.transitions.collapseDuration)
    .attr("x", (dataPoint) => dataPoint.scaledX0)
    .attr("width", (dataPoint) => dataPoint.scaledX1 - dataPoint.scaledX0);
};
