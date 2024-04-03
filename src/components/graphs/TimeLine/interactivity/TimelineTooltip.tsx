import { capitalize } from "lodash";
import { TimelineChartPointType } from "../..";

type TimelineTooltipProps = TimelineChartPointType["tooltipContent"];

export const getTimelineTooltip = (props: TimelineTooltipProps) => {
  return `
    <div ref={ref} id="tooltipTemplate" class="tippy-content" style={{ display: "flex" }}>
      <strong style="margin: auto">${capitalize(
        props?.scientificName
      )}</strong><hr/>
      <p>${`${props?.phylum} > ${props?.class} > ${props?.order} > 
      ${props?.family} > ${props?.genus} > ${props?.species} > ${props?.scientificName}`}</p>
      <br/>
      <p>Detected at: ${props?.timeDetected}</p>
      <br/>
      <p>${props?.numDetections} detections</p>
    </div>
  `;
};
