import * as d3 from "d3";
import { lineChartParameters } from "src/data/constants";
import { legend } from "src/data/idClassNames";

const mouseOverLegendHandler = (
  event: MouseEvent,
  selection: d3.Selection<d3.BaseType, string, HTMLElement, string>
) => {
  const selectedSensorID = d3
    .select(event.target as HTMLElement)
    .data() as string[];

  selection.attr("opacity", (dataLine) =>
    dataLine === selectedSensorID[0]
      ? 1
      : lineChartParameters.lines.inactiveStrokeOpacity
  );
};

const mouseOutLegendHandler = (
  selection: d3.Selection<d3.BaseType, string, HTMLElement, string>
) => {
  selection.attr("opacity", 1);
};

const clickLegendHandler = (
  event: MouseEvent,
  selection: d3.Selection<d3.BaseType, string, HTMLElement, string>
) => {
  mouseOverLegendHandler(event, selection);
};

export const addLegendInteraction = (
  parentRef: SVGSVGElement | null,
  clickChartHandler?: (event: MouseEvent) => void,
  mouseOverChartHandler?: (event: MouseEvent) => void,
  mouseOutChartHandler?: (event: MouseEvent) => void
) => {
  let selectedEntry: string | undefined = undefined;

  if (!parentRef) return;
  const selection = d3.selectAll<d3.BaseType, string>(
    `.${legend.dots.class}, .${legend.labels.class}`
  );

  mouseOverChartHandler &&
    selection.on("mouseover", (event) => {
      if (selectedEntry) return;
      mouseOverLegendHandler(event, selection);
      mouseOverChartHandler(event);
    });
  mouseOutChartHandler &&
    selection.on("mouseout", (event) => {
      if (selectedEntry) return;
      mouseOutLegendHandler(selection);
      mouseOutChartHandler(event);
    });
  clickChartHandler &&
    selection.on("click", (event) => {
      if (
        d3.select<SVGSVGElement, string>(event.target).data()[0] ===
        selectedEntry
      ) {
        selectedEntry = undefined;
        selection.dispatch("mouseout");
      } else {
        selectedEntry = d3
          .select<SVGSVGElement, string>(event.target)
          .data()[0];
        clickLegendHandler(event, selection);
        clickChartHandler(event);
      }
    });
};
