import * as d3 from "d3";
import { DataType } from "src/data/data.types";
import { NumericHistogramProps } from "../../graphsProps.types";
import { HistogramPointType } from "../../graphsPoints.types";
import { histogramClassNames } from "src/data/idClassNames";

export const histogramClickInteraction = (
  parentRef: SVGSVGElement,
  onBarClick: NonNullable<NumericHistogramProps<DataType>["onBarClick"]>
) => {
  d3.select(parentRef)
    .selectAll<SVGRectElement, HistogramPointType>(
      `.${histogramClassNames.bar}`
    )
    .style("cursor", "pointer")
    .on("click", (_, dataPoint) => onBarClick(dataPoint.scientificNames ?? []));

  return;
};
