import * as d3 from "d3";
import { LineChartDataType } from "../../LineChart/lineChart.types";
import { lineChartParameters } from "src/data/constants";

type DataType = LineChartDataType[];

export const drawLegend = (
  node: SVGSVGElement,
  data: DataType,
  colorScale: d3.ScaleOrdinal<string, string, never>
) => {
  const keys = d3
    .groups(data, (dataLine) => dataLine.id)
    .map((dataLine) => dataLine[0]);

  d3.select(node)
    .selectAll(".legendDots")
    .data(keys)
    .enter()
    .append("circle")
    .attr("class", "legendDots")
    .attr("cx", lineChartParameters.legend.fontSize)
    .attr("cy", function (_dataLine, index) {
      return (
        index * lineChartParameters.legend.gap +
        lineChartParameters.legend.fontSize
      );
    })
    .attr("r", lineChartParameters.legend.fontSize)
    .style("fill", function (dataLine) {
      return colorScale(dataLine);
    });

  d3.select(node)
    .selectAll(".legendLabels")
    .data(keys)
    .enter()
    .append("text")
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
    .style("fill", function (dataLine) {
      return colorScale(dataLine);
    })
    .text(function (dataLine) {
      return `sensor ${dataLine}`;
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");

  const bbox = node.getBBox();
  d3.select(node).attr("width", bbox.width).attr("height", bbox.height);
};
