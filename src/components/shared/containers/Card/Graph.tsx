import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraphCardHeaderLayout,
  StyledGraphCard,
  StyledGraphTitle,
} from "./styles";
import { useObserveResize } from "../../hooks/useObserveResize";
import { DashboardGraph } from "../../../dashboard/dashboardGraphs/DashboardGraph";
import { ConditionalLink } from "../../ConditionalLink";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { Button } from "@nextui-org/react";
import { ForwardIcon } from "src/icons/ForwardIcon";

export const Graph = (props: {
  graphName: string;
  title?: string;
  to?: string;
  expanded?: boolean;
}) => {
  const { graphName, to, expanded, title } = props;

  const navigate = useNavigate();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  const graphProps = {
    dimensions: dimensions ?? [0, 0],
    isFullInteractive: expanded,
  };

  return (
    <StyledGraphCard $noBorder={expanded} $hasTitle={!!title}>
      {title && (
        <GraphCardHeaderLayout>
          <ConditionalLink condition={!!to} to={to}>
            <StyledGraphTitle>{title}</StyledGraphTitle>
          </ConditionalLink>
          <ConditionalLink condition={!!to} to={to}>
            <Button
              variant="light"
              endContent={<ForwardIcon />}
              onPress={() => {
                !!to && navigate(to);
              }}
            >
              Insights
            </Button>
          </ConditionalLink>
        </GraphCardHeaderLayout>
      )}
      <div ref={resizeContainerRef}>
        {renderGraph(
          <DashboardGraph graphName={graphName} graphProps={graphProps} />,
          dimensions
        )}
      </div>
    </StyledGraphCard>
  );
};
