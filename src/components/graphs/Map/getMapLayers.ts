import * as d3 from "d3";
import { ScaleSequential } from "d3";
import { GeoJsonProperties } from "geojson";
import L from "leaflet";
import { mapChartParameters } from "src/data/constants";
import { MapChartDataType } from "..";

const getMarkerHtmlStyles = (
  color: string,
  width?: number,
  height?: number
) => `
  background-color: ${color};
  width: ${width ?? 24}px;
  height: ${height ?? 24}px;
  display: block;
  left: -${width ? width / 2 : 12}px;
  top: -${width ? width : 24}px;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

export const getGeoJsonLayers = <
  T extends {
    data:
      | d3.ExtendedFeatureCollection<
          d3.ExtendedFeature<d3.GeoGeometryObjects | null, GeoJsonProperties>
        >
      | undefined;
  }
>(
  map: L.Map,
  data: T[],
  colorScale: ScaleSequential<string, never>
) => {
  const geoJsonLayer = L.geoJSON().addTo(map);

  const dronePathLayers = data.map((dronePath, key) =>
    L.geoJSON(dronePath.data, {
      style: (feature) => {
        if (feature?.geometry.type !== "LineString") {
          return {};
        }
        return {
          color: colorScale(key / data.length),
          opacity: 0.7,
        };
      },

      pointToLayer: (_, latlng) => {
        return L.marker(latlng, {
          icon: mapChartParameters.icons.colorable(
            getMarkerHtmlStyles(colorScale(key / data.length))
          ),
        });
      },

      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.name)
          layer.bindTooltip(feature.properties.name);

        if (feature?.geometry.type === "LineString") {
          layer.on({
            mouseover: (event) => {
              const hoveredLayer = event.target;
              hoveredLayer.setStyle({
                weight: 6,
                opacity: 1,
              });
            },
            mouseout: (event) => {
              const hoveredLayer = event.target;
              hoveredLayer.setStyle({
                weight: 4,
                opacity: 0.7,
              });
            },
          });
        }
      },
    })
  );

  dronePathLayers.forEach((layer) => layer.addTo(geoJsonLayer));

  return { geoJsonLayer, children: dronePathLayers };
};

export const getDetectionsLayer = (
  map: L.Map,
  data: MapChartDataType[] | undefined
) => {
  const detectionsLayer = L.layerGroup().addTo(map);

  const eachDetectionLayer = data?.map((detection) => {
    return L.marker([detection.latitude, detection.longitude], {
      icon: mapChartParameters.icons.detection,
    }).bindPopup(`${detection.observationsNum} detections`);
  });

  eachDetectionLayer &&
    eachDetectionLayer.forEach((layer) => layer.addTo(detectionsLayer));

  return { detectionsLayer, children: eachDetectionLayer };
};
