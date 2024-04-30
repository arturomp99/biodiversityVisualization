import { capitalize } from "lodash";
import { TimelineChartPointType } from "../..";

type TimelineTooltipProps = TimelineChartPointType["tooltipContent"];

export const getTimelineTooltip = (props: TimelineTooltipProps) => {
  const date = new Date(props?.timeDetected ?? 0);
  return `
    <div ref={ref} id="tooltipTemplate" class="tippy-content" style="display: flex; flex-direction: column">
      <strong style="margin: auto">${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</strong><hr/>
      <strong>${capitalize(props?.species)}</strong>
      <p>${props?.numDetections} observations</p>
    </div>
  `;
};
