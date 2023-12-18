import React, { FC, useEffect, createRef } from "react";
import { GraphProps } from "../graphs.types";
import { drawMap } from "./drawMap";
import { StyledMapContainer } from "./styles";
import { mapIdNames } from "src/data/idClassNames";
import { addZoom } from "../shared/Interactivity/zoom";
import { mapChartParameters } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";

export const Map: FC<GraphProps> = ({ isBasicInteractive, dimensions }) => {
  const {
    mapData: { data, loading },
  } = useDataContext();
  const node = createRef<SVGSVGElement>();
  const zoomContainer = createRef<SVGSVGElement>();

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!data || !node.current || !zoomContainer.current) {
      return;
    }
    drawMap(data, zoomContainer.current, dimensions);
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading || !realDimensions || !node.current) return;
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

  if (loading) {
    return <div>LOADING MAP DATA...</div>;
  }

  return (
    <StyledMapContainer ref={node} id={`${mapIdNames.container}`}>
      <g ref={zoomContainer} id={`${mapIdNames.zoomContainer}`} />
    </StyledMapContainer>
  );
};
