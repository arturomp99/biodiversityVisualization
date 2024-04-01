import * as d3 from "d3";
import { lineChartParameters } from "src/data/constants";
import { legend } from "src/data/idClassNames";
import { LegendProps } from "./Legend.types";
import { isSequentialScale } from "src/utils/bodyguards";

export const drawLegend = (
  node: SVGSVGElement,
  keys: string[],
  colorScale: LegendProps["colorScale"]
) => {
  d3.select(node)
    .selectAll(`.${legend.dots.class}`)
    .data(keys)
    .enter()
    .append("circle")
    .attr("class", legend.dots.class)
    .attr("cx", lineChartParameters.legend.fontSize)
    .attr("cy", function (_dataLine, index) {
      return (
        index * lineChartParameters.legend.gap +
        lineChartParameters.legend.fontSize
      );
    })
    .attr("r", lineChartParameters.legend.fontSize)
    .style("fill", function (dataLine, index) {
      if (isSequentialScale(colorScale)) {
        return colorScale(index / keys.length);
      }
      return colorScale(dataLine);
    })
    .style("cursor", "pointer");

  d3.select(node)
    .selectAll(`.${legend.labels.class}`)
    .data(keys)
    .enter()
    .append("text")
    .attr("class", legend.labels.class)
    .attr(
      "x",
      lineChartParameters.legend.gap + lineChartParameters.legend.separation
    )
    .attr("y", function (_dataLine, index) {
      return (
        index * lineChartParameters.legend.gap +
        lineChartParameters.legend.fontSize
      );
    })
    .style("fill", function (dataLine, index) {
      if (isSequentialScale(colorScale)) {
        return colorScale(index / keys.length);
      }
      return colorScale(dataLine);
    })
    .style("cursor", "pointer")
    .text(function (dataLine) {
      return `${dataLine}`;
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");

  const bbox = node.getBBox();
  d3.select(node)
    .attr("width", bbox.width + 2 * lineChartParameters.legend.margin)
    .attr("height", bbox.height + 2 * lineChartParameters.legend.margin);
};
