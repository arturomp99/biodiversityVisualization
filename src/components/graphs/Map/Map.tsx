import React, { FC, useEffect, useState, createRef, useCallback } from "react";
import { GraphProps } from "../graphs.types";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { drawMap } from "./drawMap";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { observeResize } from "src/utils/observeResize";
import { addZoom } from "../shared/Interactivity/zoom";
import { mapChartParameters } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";

export const Map: FC<GraphProps> = ({ isBasicInteractive }) => {
  const {
    mapData: { data, loading },
  } = useDataContext();
  const [shouldDrawMap, setShouldDrawMap] = useState(false);

  const node = createRef<SVGSVGElement>();
  const zoomContainer = createRef<SVGSVGElement>();
  const { dimensions, setDimensions: setGraphDimensions } = useGetGraphCoordSys(
    [0, 0]
  );

  const resizeEventHandler = useCallback(
    (resizedElement: ResizeObserverEntry[]) => {
      setGraphDimensions([
        resizedElement[0].contentRect.width,
        resizedElement[0].contentRect.height,
      ]);
    },
    []
  );

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
    observeResize(node.current, resizeEventHandler);
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
