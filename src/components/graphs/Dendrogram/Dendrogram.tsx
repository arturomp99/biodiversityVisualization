import React, { useState, useEffect, createRef, useCallback, FC } from "react";
import { dendrogramData } from "src/data";
import { DendrogramProps, TreeDataType } from "./dendrogram.types";
import { useGetGraphCoordSys } from "../shared/hooks/useGetGraphCoordSys";
import { StyledDendrogramContainer } from "./styles";
import { observeResize } from "src/utils/observeResize";
import { dendrogramIdNames } from "src/data/idClassNames";
import { drawDendrogram, scaleData } from "./drawDendrogram";
import { addZoom } from "../shared/Interactivity/zoom";

export const Dendrogram: FC<DendrogramProps> = ({ isBasicInteractive }) => {
  // TODO: CLEANUP - This is only added to read the sample data quickly
  const [data, setData] = useState<TreeDataType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [shouldDrawDendrogram, setShouldDrawDendrogram] = useState(false);
  useEffect(() => {
    if (!dendrogramData) {
      return;
    }
    setLoading(false);
    setData(dendrogramData as TreeDataType);
    // setData(dendrogramData as DendrogramDataType);
  });
  // TODO -----------------------------------------------------------------

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
      addZoom(node.current, zoomContainer.current);
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
