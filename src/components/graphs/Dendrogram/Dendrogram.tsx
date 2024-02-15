import React, { useEffect, createRef, FC } from "react";
import { StyledDendrogramContainer } from "./styles";
import { dendrogramIdNames } from "src/data/idClassNames";
import { drawDendrogram, scaleData } from "./drawDendrogram";
import { addZoom } from "../shared/Interactivity/zoom/zoom";
import { GraphProps } from "../graphs.types";
import { dendrogramParameters } from "src/data/constants";
import { useDataContext } from "src/contexts/dataContext";
import { getDimensionsWithoutMargin } from "src/utils/getDimensionsWithoutMargin";
import { makeNodesCollapsible } from "./interactivtiy/nodesInteractivity";
import { dendrogramHandleZoomEnd } from "./interactivtiy/zoomInteractivity";
import { useFiltersContext } from "src/contexts/filtersContext";
import { taxonomicFilter } from "src/data/filters";

export const Dendrogram: FC<GraphProps> = ({
  isBasicInteractive,
  dimensions,
}) => {
  const {
    taxonomicClassification: { data, loading },
  } = useDataContext();
  const { setFilters } = useFiltersContext();
  useEffect(() => setFilters && setFilters(taxonomicFilter), []);

  const node = createRef<SVGSVGElement>();
  const zoomContainer = createRef<SVGSVGElement>();

  const realDimensions = getDimensionsWithoutMargin(dimensions);

  useEffect(() => {
    if (!data || !zoomContainer.current) return;
    const scaledData = scaleData(data, realDimensions);
    drawDendrogram(scaledData, zoomContainer.current);
    if (isBasicInteractive) {
      makeNodesCollapsible(zoomContainer.current);
    }
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
