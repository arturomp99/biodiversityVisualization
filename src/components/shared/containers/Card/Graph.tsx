import React from "react";
import { StyledGraphCard, StyledGraphTitle } from "./styles";
import { useObserveResize } from "../../hooks/useObserveResize";
import { useGetGraph } from "../../hooks/useGetGraph";
import { ConditionalLink } from "../../ConditionalLink";

export const Graph = (props: {
  graphName: string;
  title?: string;
  to?: string;
  expanded?: boolean;
}) => {
  const { graphName, to, expanded, title } = props;

  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  const renderGraph = () => {
    if (!dimensions) {
      return <div>loading...</div>;
    }

    const graphProps = { dimensions };
    return useGetGraph(graphName, graphProps);
  };

  return (
    <StyledGraphCard noBorder={expanded} hasTitle={!!title}>
      {title && (
        <ConditionalLink condition={!!to} to={to}>
          <StyledGraphTitle>{title}</StyledGraphTitle>
        </ConditionalLink>
      )}
      <div ref={resizeContainerRef}>{renderGraph()}</div>
    </StyledGraphCard>
  );
};
