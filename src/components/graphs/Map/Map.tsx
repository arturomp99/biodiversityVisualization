import React, { FC, useEffect, createRef, useState } from "react";
import L from "leaflet";
import { GraphProps } from "../graphsProps.types";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { useDataContext } from "src/contexts/dataContext";
import { mapChartParameters } from "src/data/constants";
// import { createMapTooltip } from "./interactivity/createMapTooltip";

export const Map: FC<GraphProps> = () => {
  const { geoJsonData } = useDataContext();
  const [map, setMap] = useState<L.Map | undefined>();
  const node = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!map) {
      return;
    }
    const geoJsonLayer = L.geoJSON().addTo(map);
    geoJsonData.dronePaths.forEach((dronePath) =>
      L.geoJSON(dronePath.data).addTo(geoJsonLayer)
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
