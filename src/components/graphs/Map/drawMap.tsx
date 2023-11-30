import * as d3 from "d3";
import { GeoJSONDataFeature } from "./map.types";

const getGenerator = (
  data: GeoJSONDataFeature,
  dimensions: [number, number]
) => {
  const projection = d3.geoMercator().fitSize(dimensions, data);
  const generator = d3.geoPath().projection(projection);
  return generator;
};

export const drawMap = (
  data: GeoJSONDataFeature,
  parentRef: SVGSVGElement,
  dimensions: [number, number]
) => {
  const generator = getGenerator(data, dimensions);

  d3.select(parentRef)
    .selectAll("path")
    .data([data])
    .join("path")
    .attr("d", generator)
    .attr("fill", "none")
    .attr("stroke", "black");
};
