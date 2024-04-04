import * as d3 from "d3";
import type { DataType } from "src/data/data.types";
import type { HistogramPointType, HistogramProps } from "../..";
import { histogramClassNames } from "src/data/idClassNames";

export const histogramHoverInteraction = (
  parentRef: SVGSVGElement,
  onHover: NonNullable<HistogramProps<DataType>["onHover"]>
) => {
  d3.select(parentRef)
    .selectAll<SVGRectElement, HistogramPointType>(
      `.${histogramClassNames.bar}`
    )
    .on("mouseover", (_, dataPoint) => onHover(dataPoint.ids ?? []))
    .on("mouseout", () => onHover([]));
  return;
};
