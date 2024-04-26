import { select } from "d3";
import { tippy } from "@tippyjs/react";
import { barChartClassNames } from "src/data/idClassNames";
export const addTooltip = <T>(
  parentRef: SVGSVGElement,
  getTooltipContent: (dataPoint: T) => string,
  selector?: string
) => {
  select(parentRef)
    .selectAll<SVGRectElement, T>(selector ?? `.${barChartClassNames.rect}`)
    .each(function (dataPoint) {
      tippy(this, {
        theme: "light",
        content: getTooltipContent(dataPoint),
      });
    });
};
