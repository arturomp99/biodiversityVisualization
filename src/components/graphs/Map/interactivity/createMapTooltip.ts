// import * as d3 from "d3";
// import { mapClassNames, tooltipInteractiveClass } from "src/data/idClassNames";
// import tippy from "tippy.js";
// import { MapChartDataType } from "../../graphsData.types";

// export const getTooltipContent = (data: MapChartDataType) => {
//   return `<p>sensor ${data.sensorId || ""}
//     <ul>
//       <li>lat: ${data.latitude}</li>
//       <li>lon: ${data.longitude}</li>
//       <li>observations: ${data.observationsNum}</li>
//     </ul>
//   </p>`;
// };

// export const createMapTooltip = (parentRef: SVGSVGElement) => {
//   const markersSelection = d3
//     .select(parentRef)
//     .selectAll<SVGCircleElement, MapChartDataType>(
//       `.${mapClassNames.sensorMarker}`
//     )
//     .classed(`${tooltipInteractiveClass}`, true)
//     .attr("data-tippy-content", (dataPoint) => getTooltipContent(dataPoint));

//   tippy(markersSelection.nodes(), { allowHTML: true });
// };
