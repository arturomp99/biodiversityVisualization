import React from "react";
import { useGetSpeciesRichnessData } from "./useGetSpeciesRishnessData";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { StyledDetailChart } from "../../styles";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { BarChart } from "src/components/graphs/BarChart.ts/BarChart";

export const SpeciesRichness = () => {
  const { data, loading } = useGetSpeciesRichnessData();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  return (
    <StyledDetailChart ref={resizeContainerRef}>
      {data &&
        !loading &&
        renderGraph(
          <BarChart dimensions={dimensions ?? [0, 0]} data={data} />,
          dimensions
        )}
    </StyledDetailChart>
  );
};
