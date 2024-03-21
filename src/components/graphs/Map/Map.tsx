import React, { FC, useEffect, createRef, useState } from "react";
import L from "leaflet";
import { GraphProps } from "../graphsProps.types";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { useDataContext } from "src/contexts/dataContext";
import { createMapTooltip } from "./interactivity/createMapTooltip";

export const Map: FC<GraphProps> = () => {
  const { geoJsonData } = useDataContext();
  const [map, setMap] = useState<L.Map | undefined>();
  const node = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!node.current) return;
    const map = L.map(node.current).setView([1.3521, 103.8198], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  }, []);

  return (
    <>
      <StyledMapContainer ref={node} id={`${mapIdNames.container}`} />
    </>
  );
};
