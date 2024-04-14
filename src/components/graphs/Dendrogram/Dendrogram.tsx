import React, { useEffect, FC, useRef } from "react";
import { StyledDendrogramContainer } from "./styles";
import { dendrogramIdNames } from "src/data/idClassNames";
import { drawDendrogram, scaleData } from "./drawDendrogram";
import { addZoom } from "../shared/Interactivity/zoom/zoom";
import { DendrogramProps } from "../graphsProps.types";
import { dendrogramParameters, resizeTimeout } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { makeNodesCollapsible } from "./interactivtiy/nodesInteractivity";
import { dendrogramHandleZoomEnd } from "./interactivtiy/zoomInteractivity";
import { useDendrogramSettingsInteractivity } from "./interactivtiy/useDendrogramSettingsInteractivity";
import { addNodeInfoInteractivity } from "./interactivtiy/nodeInfoInteractivity.ts/addNodeInfoInteractivity";
import { addLeavesTooltip } from "./interactivtiy/leavesTooltip";

export const Dendrogram: FC<DendrogramProps> = ({
  isBasicInteractive,
  dimensions,
  settings,
  settingsActionCallback,
}) => {
  const {
    taxonomicClassification: { data, loading },
  } = useDataContext();

  const node = useRef<SVGSVGElement | null>(null);
  const zoomContainer = useRef<SVGSVGElement | null>(null);

  useDendrogramSettingsInteractivity(
    zoomContainer.current,
    settings,
    settingsActionCallback
  );

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!data || !zoomContainer.current) return;
    const scaledData = scaleData(data, realDimensions);
    drawDendrogram(scaledData, zoomContainer.current);
    if (isBasicInteractive) {
      makeNodesCollapsible(zoomContainer.current);
      addNodeInfoInteractivity(zoomContainer.current);
      addLeavesTooltip(zoomContainer.current);
    }
  }, [data]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading || !realDimensions || !node.current) return;
      // TODO: TRANSLATE DENDROGRAM
    }, resizeTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [realDimensions]);

  useEffect(() => {
    if (!node.current || !zoomContainer.current) return;
    if (isBasicInteractive) {
      addZoom(
        node.current,
        zoomContainer.current,
        [dendrogramParameters.zoom.min, dendrogramParameters.zoom.max],
        { handleZoomEnd: dendrogramHandleZoomEnd }
      );
    }
  }, []);

  return (
    <>
      {loading && <div>LOADING DENDROGRAM DATA...</div>}
      <StyledDendrogramContainer
        ref={node}
        id={`${dendrogramIdNames.container}`}
      >
        <g ref={zoomContainer} id={`${dendrogramIdNames.zoomContainer}`} />
      </StyledDendrogramContainer>
    </>
  );
};
