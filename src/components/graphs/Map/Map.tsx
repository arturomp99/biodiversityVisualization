import React, { FC, useEffect, useState, createRef } from "react";
import { GraphProps } from "../graphs.types";
import { drawMap } from "./drawMap";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { addZoom } from "../shared/Interactivity/zoom";
import { mapChartParameters } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";

export const Map: FC<GraphProps> = ({ isBasicInteractive, dimensions }) => {
  const {
    mapData: { data, loading },
  } = useDataContext();
  const [shouldDrawMap, setShouldDrawMap] = useState(false);

  const node = createRef<SVGSVGElement>();
  const zoomContainer = createRef<SVGSVGElement>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldDrawMap(
        !loading && !!dimensions[0] && !!dimensions[1] && !!node.current
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dimensions, loading, node.current]);

  useEffect(() => {
    if (!node.current || !zoomContainer.current) {
      return;
    }
    if (isBasicInteractive) {
      addZoom(node.current, zoomContainer.current, [
        mapChartParameters.zoom.min,
        mapChartParameters.zoom.max,
      ]);
    }
  }, [node.current]);

  useEffect(() => {
    if (!shouldDrawMap || !data || !node.current || !zoomContainer.current) {
      return;
    }
    drawMap(data, zoomContainer.current, dimensions);
  }, [shouldDrawMap]);
  return (
    <StyledMapContainer ref={node} id={`${mapIdNames.container}`}>
      <g ref={zoomContainer} id={`${mapIdNames.zoomContainer}`} />
    </StyledMapContainer>
  );
};
