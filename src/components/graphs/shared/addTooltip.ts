import { select } from "d3";
import type { Selection } from "d3";
import { tippy } from "@tippyjs/react";
import { barChartClassNames } from "src/data/idClassNames";
import { StackedBarChartPointType } from "../graphsPoints.types";

export const getStackedBarChartTooltip = (
  dataPoint: [unknown, StackedBarChartPointType[]],
  onClick?: () => void
) => {
  const count = dataPoint[1].reduce<number>(
    (acc: number, curr) => (acc += curr.species ?? 0),
    0
  );
  // const scientificNames = dataPoint[1].map(
  //   (dataPointEntry) => dataPointEntry.tooltipContent?.scientificNames
  // );
  return `<div ref={ref} id="tooltipTemplate" class="tippy-content" style="display: flex; flex-direction: column">
  <strong style="margin: auto">${count}</strong>
  ${
    onClick
      ? `<button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium bg-transparent px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none border-success hover:!text-success-foreground hover:!bg-success text-black"
        onclick='()=>${onClick}'>
    Get list
  </button>`
      : ""
  }
  </div`;
};

export const addTooltip = <T>(
  parentRef: SVGSVGElement,
  getTooltipContent: (dataPoint: T) => string,
  selector?: string,
  allowHTML?: boolean
) => {
  select(parentRef)
    .selectAll<SVGRectElement, T>(selector ?? `.${barChartClassNames.rect}`)
    .each(function (dataPoint) {
      tippy(this, {
        theme: "light",
        appendTo: document.body,
        interactive: allowHTML,
        content: getTooltipContent(dataPoint),
        allowHTML: allowHTML,
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
