import React, { useEffect, createRef, FC } from "react";
import { StyledDendrogramContainer } from "./styles";
import { dendrogramIdNames } from "src/data/idClassNames";
import { drawDendrogram, scaleData } from "./drawDendrogram";
import { addZoom } from "../shared/Interactivity/zoom";
import { GraphProps } from "../graphs.types";
import { dendrogramParameters } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";

export const Dendrogram: FC<GraphProps> = ({
  isBasicInteractive,
  dimensions,
}) => {
  const {
    dendrogramData: { data, loading },
  } = useDataContext();
  const node = createRef<SVGSVGElement>();
  const zoomContainer = createRef<SVGSVGElement>();

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!data || !zoomContainer.current) return;
    const scaledData = scaleData(data, realDimensions);
    drawDendrogram(scaledData, zoomContainer.current);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading || !realDimensions || !node.current) return;
      // TODO: TRANSLATE DENDROGRAM
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  useEffect(() => {
    if (!node.current || !zoomContainer.current) return;
    if (isBasicInteractive) {
      addZoom(node.current, zoomContainer.current, [
        dendrogramParameters.zoom.min,
        dendrogramParameters.zoom.max,
      ]);
    }
  }, []);

  if (loading) {
    return <div>LOADING DENDROGRAM DATA...</div>;
  }

  return (
    <StyledDendrogramContainer ref={node} id={`${dendrogramIdNames.container}`}>
      <g ref={zoomContainer} id={`${dendrogramIdNames.zoomContainer}`} />
    </StyledDendrogramContainer>
  );
};
