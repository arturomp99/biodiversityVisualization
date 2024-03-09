import * as d3 from "d3";
// import { barChartParameters, graphMargin } from "../../../data/constants";
import {
  StackedBarChartPointType,
  StackedBarChartProps,
} from "./BarChart.types";
import { barChartParameters, graphMargin } from "src/data/constants";
import { stackedBarChartClassNames } from "src/data/idClassNames";

export const drawBars = (
  parentRef: SVGSVGElement | null,
  data: StackedBarChartPointType[],
  onBarClick?: StackedBarChartProps["onBarClick"]
) => {
  const groupedData = d3.group(data, (dataPoint) => dataPoint.parentBarId);
  const bars = d3
    .select(parentRef)
    .selectAll<SVGGElement, [string | undefined, StackedBarChartPointType[]]>(
      `.${stackedBarChartClassNames.bar}`
    )
    .data(groupedData, (dataObject) => dataObject[0] || "");
  const barsEnter = bars
    .enter()
    .append("g")
    .attr("class", stackedBarChartClassNames.bar)
    .attr("id", (dataObject) => dataObject[0] || "")
    .style("cursor", "pointer")
    .on("mouseover", function () {
      d3.select(this)
        .selectAll<SVGSVGElement, StackedBarChartPointType>(
          `.${stackedBarChartClassNames.stackedBar}`
        )
        .attr("fill", (dataPoint) => dataPoint.color);
    })
    .on("mouseout", function () {
      d3.select(this)
        .selectAll<SVGSVGElement, StackedBarChartPointType>(
          `.${stackedBarChartClassNames.stackedBar}`
        )
        .attr("fill", barChartParameters.bars.inactiveColor);
    });
  onBarClick &&
    barsEnter.on("click", (_, dataClicked) => {
      onBarClick(dataClicked[0]);
    });
  const barsUpdate = bars;
  barsEnter.merge(barsUpdate);
  bars.exit().remove();

  const stackedBars = d3
    .selectAll<SVGGElement, [string | undefined, StackedBarChartPointType[]]>(
      `.${stackedBarChartClassNames.bar}`
    )
    .selectAll<SVGRectElement, StackedBarChartPointType>(
      `.${stackedBarChartClassNames.stackedBar}`
    )
    .data((d) => d[1]);
  const stackedBarsEnter = stackedBars
    .enter()
    .append("rect")
    .attr("class", stackedBarChartClassNames.stackedBar)
    .attr("y", (dataPoint) => dataPoint.scaledY ?? 0)
    .attr("x", (dataPoint) => dataPoint.scaledX ?? 0)
    .attr("width", (dataPoint) => dataPoint.scaledLength)
    .attr("height", barChartParameters.barWidth)
    .attr("transform", `translate(${graphMargin.left},${graphMargin.top})`)
    .attr("fill", barChartParameters.bars.inactiveColor);
  const stackedBarsUpdate = stackedBars
    .attr("width", (dataPoint) => dataPoint.scaledLength)
    .attr("x", (dataPoint) => dataPoint.scaledX ?? 0)
    .attr("y", (dataPoint) => dataPoint.scaledY ?? 0);
  stackedBarsEnter.merge(stackedBarsUpdate);
  stackedBars.exit().remove();
};
