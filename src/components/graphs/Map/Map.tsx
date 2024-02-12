import React, { FC, useEffect, createRef, useState } from "react";
import { GraphProps } from "../graphs.types";
import { drawMapMarkers, drawMap } from "./drawMap";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { addZoom } from "../shared/Interactivity/zoom/zoom";
import { mapChartParameters } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { createMapTooltip } from "./interactivity/createMapTooltip";

export const Map: FC<GraphProps> = ({ isBasicInteractive, dimensions }) => {
  const {
    mapData: map,
    sensorsData: { data, loading },
  } = useDataContext();
  const [projection, setProjection] = useState<d3.GeoProjection | undefined>();
  const node = createRef<SVGSVGElement>();
  const zoomContainer = createRef<SVGSVGElement>();

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!map.data || !zoomContainer.current) {
      return;
    }

    const { projection } = drawMap(map.data, zoomContainer.current, dimensions);
    setProjection(() => projection);
  }, [map.data]);

  useEffect(() => {
    if (!data || !zoomContainer.current || !projection) {
      return;
    }
    drawMapMarkers(data, projection, zoomContainer.current);

    if (isBasicInteractive) {
      createMapTooltip(zoomContainer.current);
    }
  }, [projection, data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (map.loading || !realDimensions || !node.current) return;
      // TODO: TRANSLATE MAP
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  useEffect(() => {
    if (!node.current || !zoomContainer.current) return;
    if (isBasicInteractive) {
      addZoom(node.current, zoomContainer.current, [
        mapChartParameters.zoom.min,
        mapChartParameters.zoom.max,
      ]);
    }
  }, []);

  if (map.loading || loading) {
    return <div>LOADING MAP DATA...</div>;
  }

  return (
    <StyledMapContainer ref={node} id={`${mapIdNames.container}`}>
      <g ref={zoomContainer} id={`${mapIdNames.zoomContainer}`} />
    </StyledMapContainer>
  );
};
