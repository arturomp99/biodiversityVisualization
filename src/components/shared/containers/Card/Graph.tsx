import React from "react";
import { Link } from "react-router-dom";
import { StyledGraphCard } from "./styles";
import { useObserveResize } from "../../hooks/useObserveResize";
import { useGetGraph } from "../../hooks/useGetGraph";

export const Graph = (props: { graphName: string }) => {
  const { containerRef, dimensions } = useObserveResize();
  const { graphName } = props;

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
      <Link to={`detail/${graphName}`}>
        {useGetGraph(graphName, graphProps)}
      </Link>
    </StyledGraphCard>
  );
};
