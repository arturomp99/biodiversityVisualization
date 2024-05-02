import * as d3 from "d3";
import type { BarChartProps } from "../../graphsProps.types";
import { BarChartPointType } from "../..";
import { barChartClassNames } from "src/data/idClassNames";

export const barChartClickInteraction = (
  parentRef: SVGSVGElement,
  onBarClick: NonNullable<BarChartProps["onBarClick"]>
) => {
  d3.select(parentRef)
    .selectAll<SVGRectElement, BarChartPointType>(`.${barChartClassNames.rect}`)
    .style("cursor", "pointer")
    .on("click", (_, dataPoint) => {
      return onBarClick([dataPoint.id ?? ""]);
    });

  return;
};
