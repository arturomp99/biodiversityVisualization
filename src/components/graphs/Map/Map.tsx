import React, { FC, useEffect, createRef, useState, useRef } from "react";
import L from "leaflet";
import { GraphProps } from "../graphsProps.types";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { useDataContext } from "src/contexts/dataContext";
import { mapChartParameters } from "src/data/constants";
import { getMapScales } from "./getMapScales";
import { drawDetections, drawGeoJson } from "./drawMap";

export const Map: FC<GraphProps> = () => {
  const { geoJsonData, detectionsPositionsData } = useDataContext();
  const mapScalesRef = useRef(getMapScales());
  const [map, setMap] = useState<L.Map | undefined>();
  const node = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!map) {
      return;
    }

    const geoJsonLayer = drawGeoJson(
      map,
      geoJsonData.dronePaths,
      mapScalesRef.current.dronePathColorScale
    );

    geoJsonLayer.getBounds().isValid() &&
      map.fitBounds(geoJsonLayer.getBounds());
  }, [map, geoJsonData.dronePaths]);

  useEffect(() => {
    if (!map) {
      return;
    }

    drawDetections(map, detectionsPositionsData.data);
  }, [map, detectionsPositionsData.data]);

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

  return (
    <>
      <StyledMapContainer ref={node} id={`${mapIdNames.container}`} />
    </>
  );
};
