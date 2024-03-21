import React, { FC, useEffect, createRef, useState } from "react";
import * as _ from "lodash";
import { GraphProps } from "../graphsProps.types";
import { drawMapMarkers, drawMap, drawGeoJson } from "./drawMap";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { addZoom } from "../shared/Interactivity/zoom/zoom";
import { mapChartParameters, resizeTimeout } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { createMapTooltip } from "./interactivity/createMapTooltip";

export const Map: FC<GraphProps> = ({ isBasicInteractive, dimensions }) => {
  const {
    mapData: map,
    sensorsData: { data, loading },
    geoJsonData,
  } = useDataContext();
  const [projection, setProjection] = useState<d3.GeoProjection | undefined>();
  const [generator, setGenerator] = useState<d3.GeoPath | undefined>();
  const node = createRef<SVGSVGElement>();
  const zoomContainer = createRef<SVGSVGElement>();

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!map.data || !zoomContainer.current) {
      return;
    }

    const { projection: mapProjection, generator: mapGenerator } = drawMap(
      map.data,
      zoomContainer.current,
      dimensions
    );
    setProjection(() => mapProjection);
    setGenerator(() => mapGenerator);
  }, [map.data]);

  useEffect(() => {
    if (!zoomContainer.current || !generator) {
      return;
    }

    geoJsonData.dronePaths.forEach(
      (dronePath, key) =>
        !!dronePath.data &&
        !!zoomContainer.current &&
        drawGeoJson(dronePath.data, zoomContainer.current, generator, {
          className: `path${key}`,
        })
    );
  }, [geoJsonData.dronePaths, generator]);

  // useEffect(() => {
  //   if (!data || !zoomContainer.current || !projection) {
  //     return;
  //   }
  //   drawMapMarkers(data, projection, zoomContainer.current);

  //   if (isBasicInteractive) {
  //     createMapTooltip(zoomContainer.current);
  //   }
  // }, [projection, data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (map.loading || !realDimensions || !node.current) return;
      // TODO: TRANSLATE MAP
    }, resizeTimeout);

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

  return (
    <>
      {(map.loading || loading) && <div>LOADING MAP DATA...</div>}
      <StyledMapContainer ref={node} id={`${mapIdNames.container}`}>
        <g ref={zoomContainer} id={`${mapIdNames.zoomContainer}`} />
      </StyledMapContainer>
    </>
  );
};
