import React, { useState } from "react";
import { useGetSpeciesEvennessData } from "./useGetSpeciesEvennessData";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { StyledDetailChart } from "../../styles";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { BarChart } from "src/components/graphs/BarChart.ts/BarChart";
import styled from "styled-components";
import { themeFont } from "src/data/theme";
import { StyledGraphCard } from "src/components/shared/containers/Card";
import { fontSize } from "src/data/constants";
import { StyledGraphSettings } from "src/components/dashboard/dashboardGraphSettings/styles";
import { SpeciesEvennessSettings } from "./SpeciesEvennessSettings";
import { GraphDetailsProps } from "../../GraphDetails";

const StyledTitle = styled.p`
  font-size: ${themeFont.h4.size};
  font-weight: ${themeFont.h3.weight};
`;

export const SpeciesEvenness = ({
  showCatalogHandler,
}: {
  showCatalogHandler?: GraphDetailsProps["showCatalogHandler"];
}) => {
  const { data, loading } = useGetSpeciesEvennessData();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();
  const [isLog, setIsLog] = useState<boolean>(true);

  return (
    <StyledGraphCard $noHover className="mt-12">
      <StyledTitle>Species evenness</StyledTitle>
      <StyledDetailChart ref={resizeContainerRef} $height="40vh">
        <>
          {data &&
            !loading &&
            renderGraph(
              <BarChart
                dimensions={dimensions ?? [0, 0]}
                data={data}
                isXLabelDiagonal
                customMargin={{ bottom: 10 * fontSize }}
                isFullInteractive
                isLog={isLog}
                onBarClick={showCatalogHandler}
              />,
              dimensions
            )}
        </>
        <StyledGraphSettings $isRightCorner>
          <SpeciesEvennessSettings isLogCallback={setIsLog} />
        </StyledGraphSettings>
      </StyledDetailChart>
    </StyledGraphCard>
  );
};
