import React, { FC } from "react";
import { GraphProps, Map } from "src/components/graphs";
import { OnGroundChartLayout, StyledGraph } from "./styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { SoundCarousel } from "./SoundCarousel";

export const OnGroundChart: FC<GraphProps> = ({
  isFullInteractive,
  showCatalogHandler,
}) => {
  const { containerRef: mapContainerRef, dimensions: mapDimensions } =
    useObserveResize();
  return (
    <OnGroundChartLayout isExpanded={isFullInteractive}>
      <StyledGraph ref={mapContainerRef} isExpanded={isFullInteractive}>
        {renderGraph(
          <Map
            isBasicInteractive
            dimensions={mapDimensions ?? [0, 0]}
            showCatalogHandler={showCatalogHandler}
          />,
          mapDimensions
        )}
      </StyledGraph>
      <SoundCarousel />
    </OnGroundChartLayout>
  );
};
