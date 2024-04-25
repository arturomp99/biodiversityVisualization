import { TimelineChartPointType } from "../..";

type TimelineTooltipProps = TimelineChartPointType["tooltipContent"];

export const getTimelineTooltip = (props: TimelineTooltipProps) => {
  const date = new Date(props?.timeDetected ?? 0);
  return `
    <div ref={ref} id="tooltipTemplate" class="tippy-content" style="display: flex; flex-direction: column">
      <strong style="margin: auto">${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</strong><hr/>
      <p>${props?.numDetections} observations</p>
        <p>${props?.phylum}</p> 
        <p style="margin-left: 1rem">${props?.class}</p>
        <p style="margin-left: 2rem">${props?.order}</p>
        <p style="margin-left: 3rem">${props?.family}</p>
        <p style="margin-left: 4rem">${props?.genus}</p>
        <p style="margin-left: 5rem">${props?.species}</p>
    </div>
  `;
};
