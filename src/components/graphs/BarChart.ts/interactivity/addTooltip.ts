import { select } from "d3";
import { tippy } from "@tippyjs/react";
import { BarChartPointType } from "../../graphsPoints.types";
import { barChartClassNames } from "src/data/idClassNames";
export const addTooltip = (parentRef: SVGSVGElement) => {
  select(parentRef)
    .selectAll<SVGRectElement, BarChartPointType>(`.${barChartClassNames.rect}`)
    .each(function (dataPoint) {
      tippy(this, {
        content: `${dataPoint.tooltipContent?.numDetections} detections`,
      });
    });
};
