import { Geometry } from "geojson";
import L from "leaflet";

export const drawMapLayers = (
  layers: L.GeoJSON<unknown, Geometry>[] | L.LayerGroup<unknown>,
  map: L.Map
) => {
  Array.isArray(layers)
    ? layers.forEach((layer) => layer.addTo(map))
    : layers.addTo(map);
};
