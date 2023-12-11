import React, { useState, useEffect, createRef, useCallback, FC } from "react";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { StyledDendrogramContainer } from "./styles";
import { observeResize } from "src/utils/observeResize";
import { dendrogramIdNames } from "src/data/idClassNames";
import { drawDendrogram, scaleData } from "./drawDendrogram";
import { addZoom } from "../shared/Interactivity/zoom";
import { GraphProps } from "../graphs.types";
import { dendrogramParameters } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";

export const Dendrogram: FC<GraphProps> = ({ isBasicInteractive }) => {
  const {
    dendrogramData: { data, loading },
  } = useDataContext();
  const [shouldDrawDendrogram, setShouldDrawDendrogram] = useState(false);

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
      setShouldDrawDendrogram(
        !loading && !!dimensions[0] && !!dimensions[1] && !!node.current
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dimensions, loading]);

  useEffect(() => {
    if (!node.current || !zoomContainer.current) {
      return;
    }
    if (isBasicInteractive) {
      addZoom(node.current, zoomContainer.current, [
        dendrogramParameters.zoom.min,
        dendrogramParameters.zoom.max,
      ]);
    }
    observeResize(node.current, resizeEventHandler);
  }, [node.current]);

  useEffect(() => {
    if (!shouldDrawDendrogram || !data || !zoomContainer.current) {
      return;
    }
    const scaledData = scaleData(data, dimensions);
    drawDendrogram(scaledData, zoomContainer.current);
  }, [shouldDrawDendrogram]);

  return (
    <StyledDendrogramContainer ref={node} id={`${dendrogramIdNames.container}`}>
      <g ref={zoomContainer} id={`${dendrogramIdNames.zoomContainer}`} />
    </StyledDendrogramContainer>
  );
};
