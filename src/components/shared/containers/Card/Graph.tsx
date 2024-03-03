import React from "react";
import { StyledGraphCard, StyledGraphTitle } from "./styles";
import { useObserveResize } from "../../hooks/useObserveResize";
import { useGetGraph } from "../../hooks/useGetGraph";
import { ConditionalLink } from "../../ConditionalLink";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";

export const Graph = (props: {
  graphName: string;
  title?: string;
  to?: string;
  expanded?: boolean;
}) => {
  const { graphName, to, expanded, title } = props;

  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  const graphProps = { dimensions: dimensions ?? [0, 0] };

  return (
    <StyledGraphCard $noBorder={expanded} $hasTitle={!!title}>
      {title && (
        <ConditionalLink condition={!!to} to={to}>
          <StyledGraphTitle>{title}</StyledGraphTitle>
        </ConditionalLink>
      )}
      <div ref={resizeContainerRef}>
        {renderGraph(useGetGraph(graphName, graphProps), dimensions)}
      </div>
    </StyledGraphCard>
  );
};
