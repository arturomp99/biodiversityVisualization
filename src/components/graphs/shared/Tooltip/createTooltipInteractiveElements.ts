import * as d3 from "d3";
import { tooltipInteractiveClass } from "src/data/idClassNames";

export const createTooltipInteractiveElements = (
  parentRef: SVGSVGElement,
  arrayOfSelectors: string[]
) => {
  arrayOfSelectors.forEach((selector) => {
    d3.select(parentRef)
      .selectAll(selector)
      .classed(`${tooltipInteractiveClass}`, true);
  });
};
