import { FC, createRef, useEffect } from "react";

import { LegendProps } from "./Legend.types";
import { StyledLegendContainer } from "../../LineChart/styles";
import { drawLegend } from "./drawLegend";
import React from "react";
import { addLegendInteraction } from "./addLegendInteraction";

export const Legend: FC<LegendProps> = (props) => {
  const { keys, colorScale, interactivity } = props;
  const legendRef = createRef<SVGSVGElement>();

  useEffect(() => {
    if (legendRef.current) {
      drawLegend(legendRef.current, keys, colorScale, !!interactivity);
      addLegendInteraction(
        legendRef.current,
        interactivity?.clickHandler,
        interactivity?.mouseOverHandler,
        interactivity?.mouseOutHandler
      );
    }
  }, []);

  return <StyledLegendContainer id="legendContainer" ref={legendRef} />;
};
