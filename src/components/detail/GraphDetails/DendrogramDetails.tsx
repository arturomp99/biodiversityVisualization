import React from "react";
import { BarChart } from "src/components/graphs/BarChart/BarChart";
import { StyledDetailChart } from "./styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";

export const DendrogramDetails = () => {
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  return (
    <StyledDetailChart ref={resizeContainerRef}>
      {renderGraph(
        <BarChart
          dimensions={dimensions ?? [0, 0]}
          isBasicInteractive
          data={[
            { id: "hola", count: 2 },
            { id: "adios", count: 10 },
            { id: "total", count: 12 },
          ]}
        />,
        dimensions
      )}
    </StyledDetailChart>
  );
};
