import React, { FC, useEffect, createRef, useState, useRef } from "react";
import L from "leaflet";
import { GraphProps } from "../graphsProps.types";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { useDataContext } from "src/contexts/dataContext";
import { mapChartParameters } from "src/data/constants";
import { getMapScales } from "./getMapScales";

export const Map: FC<GraphProps> = () => {
  const { geoJsonData } = useDataContext();
  const mapScalesRef = useRef(getMapScales());
  const [map, setMap] = useState<L.Map | undefined>();
  const node = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!map) {
      return;
    }
    const geoJsonLayer = L.geoJSON().addTo(map);
    geoJsonData.dronePaths.forEach((dronePath, key) =>
      L.geoJSON(dronePath.data, {
        style: (feature) => {
          if (feature?.geometry.type !== "LineString") {
            return {};
          }
          return {
            color: mapScalesRef.current.dronePathColorScale(
              key / geoJsonData.dronePaths.length
            ),
            opacity: 0.7,
          };
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
      }).addTo(geoJsonLayer)
    );

    geoJsonLayer.getBounds().isValid() &&
      map.fitBounds(geoJsonLayer.getBounds());
  }, [map, geoJsonData.dronePaths]);

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
