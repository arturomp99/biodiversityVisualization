import React from "react";
import { Link } from "react-router-dom";
import { StyledGraphCard } from "./styles";
import { useObserveResize } from "../../hooks/useObserveResize";
import { useGetGraph } from "../../hooks/useGetGraph";

export const Graph = (props: { graphName: string; to?: string }) => {
  const { graphName, to } = props;

  const { containerRef, dimensions } = useObserveResize();

  if (!dimensions) {
    return (
      <StyledGraphCard ref={containerRef}>
        <div>loading...</div>
      </StyledGraphCard>
    );
  }

  const graphProps = { dimensions };
  return (
    <StyledGraphCard ref={containerRef}>
      {to ? (
        <Link to={to}>{useGetGraph(graphName, graphProps)}</Link>
      ) : (
        useGetGraph(graphName, graphProps)
      )}
    </StyledGraphCard>
  );
};
