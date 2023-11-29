import * as d3 from "d3";
import { GeoJSONDataFeature } from "./map.types";

export const scaleData = (
  data: GeoJSONDataFeature,
  dimensions: [number, number]
) => {
  return d3.geoMercator().fitSize(dimensions, data.geometry);
};
