import React, {
  FC,
  useEffect,
  createRef,
  useState,
  useRef,
  useCallback,
} from "react";
import L from "leaflet";
import { GraphProps } from "../graphsProps.types";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { useDataContext } from "src/contexts/dataContext";
import { mapChartParameters } from "src/data/constants";
import { getMapScales } from "./getMapScales";
import { getDetectionsLayer, getGeoJsonLayers } from "./getMapLayers";
import { MapLegend } from "./interactivity/mapLegend/MapLegend";
import { drawMapLayers } from "./drawMapLayers";

export const Map: FC<GraphProps> = ({ showCatalogHandler }) => {
  const { geoJsonData, detectionsPositionsData } = useDataContext();
  const mapScalesRef = useRef<ReturnType<typeof getMapScales>>(getMapScales());
  const mapLayers = useRef<{
    geojson: ReturnType<typeof getGeoJsonLayers> | undefined;
    detections: ReturnType<typeof getDetectionsLayer> | undefined;
  }>({ geojson: undefined, detections: undefined });
  const [map, setMap] = useState<L.Map | undefined>();
  const node = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!map || !geoJsonData.data) {
      return;
    }
    if (mapLayers.current.geojson?.geoJsonLayer) {
      map.removeLayer(mapLayers.current.geojson.geoJsonLayer);
    }
    mapLayers.current.geojson = getGeoJsonLayers(
      map,
      geoJsonData.data,
      mapScalesRef.current.dronePathColorScale
    );
  }, [map, geoJsonData.data]);

  useEffect(() => {
    if (!map) {
      return;
    }
    if (mapLayers.current.detections?.detectionsLayer) {
      map.removeLayer(mapLayers.current.detections.detectionsLayer);
    }
    mapLayers.current.detections = getDetectionsLayer(
      map,
      detectionsPositionsData.data,
      showCatalogHandler
    );
  }, [map, detectionsPositionsData.data]);

  useEffect(() => {
    if (!map) {
      return;
    }
    if (mapLayers.current.detections) {
      drawMapLayers(mapLayers.current.detections.detectionsLayer, map);
    }
    if (mapLayers.current.geojson) {
      drawMapLayers(mapLayers.current.geojson.geoJsonLayer, map);
      mapLayers.current.geojson.geoJsonLayer.getBounds().isValid() &&
        map.fitBounds(mapLayers.current.geojson.geoJsonLayer.getBounds());
    }
  }, [map, mapLayers.current]);

  useEffect(() => {
    setMap(() => {
      if (!node.current) return;
      const map = L.map(node.current)
        .setView([1.3521, 103.8198], 13)
        .setMaxZoom(mapChartParameters.zoom.maxLevel);

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='http://www.example.com/'>Example</a>",
        maxNativeZoom: 19,
        maxZoom: mapChartParameters.zoom.maxLevel,
      }).addTo(map);
      return map;
    });
  }, []);

  const onLegendChangeHandler = useCallback(
    (isSelected: boolean, isDronePaths: boolean, layerIndex: number) => {
      if (
        !mapLayers.current.geojson ||
        !mapLayers.current.detections ||
        !mapLayers.current.geojson.children ||
        !mapLayers.current.detections.children ||
        !map
      ) {
        return;
      }
      if (isDronePaths) {
        isSelected
          ? mapLayers.current.geojson.children[layerIndex].addTo(
              mapLayers.current.geojson.geoJsonLayer
            )
          : mapLayers.current.geojson.geoJsonLayer.removeLayer(
              mapLayers.current.geojson.children[layerIndex]
            );
      } else if (!isDronePaths) {
        isSelected
          ? mapLayers.current.detections.detectionsLayer.addTo(map)
          : map.removeLayer(mapLayers.current.detections.detectionsLayer);
      }
    },
    [map, mapLayers.current]
  );

  return (
    <>
      <StyledMapContainer ref={node} id={`${mapIdNames.container}`} />
      {!!geoJsonData && geoJsonData.data && mapScalesRef.current && (
        <MapLegend
          keys={[...geoJsonData.data.map((_, index) => `Drone path ${index}`)]}
          onValueChange={onLegendChangeHandler}
          colorScale={mapScalesRef.current.dronePathColorScale}
          filterable
        />
      )}
    </>
  );
};
