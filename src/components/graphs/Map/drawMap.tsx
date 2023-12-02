import * as d3 from "d3";

const getGenerator = (
  data: d3.ExtendedFeatureCollection,
  dimensions: [number, number]
) => {
  // TODO: Correct the fact that the GeoJSON has the map frame included
  const projection = d3.geoMercator().fitSize(dimensions, data);
  const generator = d3.geoPath().projection(projection);
  return generator;
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
    .attr("d", generator)
    .attr("fill", "none")
    .attr("stroke", "black");
};
