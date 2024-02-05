import * as d3 from "d3";
import { MapChartDataType } from "./map.types";
import { mapClassNames } from "src/data/idClassNames";
import { mapChartParameters } from "src/data/constants";

const getGenerator = (
  data: d3.ExtendedFeatureCollection,
  dimensions: [number, number]
) => {
  const projection = d3.geoMercator().fitSize(dimensions, data);
  const generator = d3.geoPath().projection(projection);
  return { projection, generator };
};

export const drawMap = (
  data: d3.ExtendedFeatureCollection,
  parentRef: SVGSVGElement,
  dimensions: [number, number]
) => {
  const generator = getGenerator(data, dimensions);

  d3.select(parentRef)
    .selectAll("path")
    .data([data])
    .join("path")
    .attr("d", generator.generator)
    .attr("fill", "none")
    .attr("stroke", "black");

  return generator;
};

export const drawMapMarkers = (
  data: MapChartDataType[],
  projection: d3.GeoProjection,
  parentRef: SVGSVGElement
) => {
  d3.select(parentRef)
    .selectAll(`.${mapClassNames.sensorMarkersGroup}`)
    .data([null])
    .enter()
    .append("g")
    .attr("class", `${mapClassNames.sensorMarkersGroup}`)
    .selectAll(`.${mapClassNames.sensorMarker}`)
    .data(data)
    .join("circle")
    .attr(
      "transform",
      (dataPoint) =>
        `translate(${projection([dataPoint.longitude, dataPoint.latitude])})`
    )
    .attr("r", mapChartParameters.markerCircles.radius)
    .attr("fill", mapChartParameters.markerCircles.fill);

  return;
};