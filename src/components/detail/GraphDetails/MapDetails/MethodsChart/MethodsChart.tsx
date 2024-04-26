import React from "react";
import { StyledGraphCard } from "src/components/shared/containers/Card";
import { StyledGraphTitle } from "src/components/shared/containers/Card/styles";
import { StyledDetailChart } from "../../styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";

export const MethodsChart = () => {
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  return (
    <StyledGraphCard $noHover>
      <StyledGraphTitle>Detections methods</StyledGraphTitle>
      <StyledDetailChart ref={resizeContainerRef}></StyledDetailChart>
    </StyledGraphCard>
  );
};
