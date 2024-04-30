import { select } from "d3";
import type { Selection } from "d3";
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

export const addTooltiptToSelection = <ElementT extends Element, DataT>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selection: Selection<ElementT, DataT, any, any>,
  getTooltipContent: (dataPoint: DataT) => string
) => {
  selection.each(function (dataPoint) {
    tippy(this, {
      theme: "light",
      content: getTooltipContent(dataPoint),
    });
  });
}; // TODO: Tooltip content is not updated when the graph is updated
