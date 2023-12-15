import React, { useState, useEffect, createRef, FC } from "react";
import { StyledDendrogramContainer } from "./styles";
import { dendrogramIdNames } from "src/data/idClassNames";
import { drawDendrogram, scaleData } from "./drawDendrogram";
import { addZoom } from "../shared/Interactivity/zoom";
import { GraphProps } from "../graphs.types";
import { dendrogramParameters } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";

export const Dendrogram: FC<GraphProps> = ({
  isBasicInteractive,
  dimensions,
}) => {
  const {
    dendrogramData: { data, loading },
  } = useDataContext();
  const [shouldDrawDendrogram, setShouldDrawDendrogram] = useState(false);

  const node = createRef<SVGSVGElement>();
  const zoomContainer = createRef<SVGSVGElement>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShouldDrawDendrogram(!loading && !!dimensions && !!node.current);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dimensions, loading, node]);

  useEffect(() => {
    if (!node.current || !zoomContainer.current) return;
    if (isBasicInteractive) {
      addZoom(node.current, zoomContainer.current, [
        dendrogramParameters.zoom.min,
        dendrogramParameters.zoom.max,
      ]);
    }
  }, []);

  useEffect(() => {
    if (!shouldDrawDendrogram || !data || !zoomContainer.current) return;
    const scaledData = scaleData(data, dimensions);
    drawDendrogram(scaledData, zoomContainer.current);
  }, [shouldDrawDendrogram]);

  return (
    <StyledDendrogramContainer ref={node} id={`${dendrogramIdNames.container}`}>
      <g ref={zoomContainer} id={`${dendrogramIdNames.zoomContainer}`} />
    </StyledDendrogramContainer>
  );
};
