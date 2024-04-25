import React from "react";
import { useGetSpeciesRichnessData } from "./useGetSpeciesRishnessData";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { StyledDetailChart } from "../../styles";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { BarChart } from "src/components/graphs/BarChart.ts/BarChart";
import styled from "styled-components";
import { themeFont } from "src/data/theme";
import { StyledGraphCard } from "src/components/shared/containers/Card";
import { fontSize } from "src/data/constants";

const StyledTitle = styled.p`
  font-size: ${themeFont.h3.size};
  font-weight: ${themeFont.h3.weight};
`;

export const SpeciesRichness = () => {
  const { data, loading } = useGetSpeciesRichnessData();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  return (
    <StyledGraphCard $noHover className="mt-12">
      <StyledTitle>Species richness</StyledTitle>
      <StyledDetailChart ref={resizeContainerRef} $height="40vh">
        {data &&
          !loading &&
          renderGraph(
            <BarChart
              dimensions={dimensions ?? [0, 0]}
              data={data}
              isXLabelDiagonal
              customMargin={{ bottom: 10 * fontSize }}
              isFullInteractive
            />,
            dimensions
          )}
      </StyledDetailChart>
    </StyledGraphCard>
  );
};
