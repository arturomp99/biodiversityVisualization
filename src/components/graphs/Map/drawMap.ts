import * as d3 from "d3";
import { mapClassNames } from "src/data/idClassNames";
import { mapChartParameters } from "src/data/constants";
import { MapChartDataType } from "../graphsData.types";

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
    .attr("fill", mapChartParameters.markerCircles.fill)
    .attr("class", mapClassNames.sensorMarker);

  return;
};

export const drawGeoJson = (
  data: d3.ExtendedFeatureCollection,
  parentRef: SVGSVGElement,
  generator: d3.GeoPath<unknown, d3.GeoPermissibleObjects>,
  properties: { className: string; color?: string; strokeWidth?: string }
) => {
  d3.select(parentRef)
    .selectAll(`.${properties.className}`)
    .data(data.features)
    .join("path")
    .attr("d", generator)
    .attr("fill", "none")
    .attr("stroke", properties.color || "black")
    .attr("stroke-width", properties.strokeWidth || 0.001)
    .attr("class", properties.className);
};
