import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraphCardHeaderLayout,
  StyledGraphCard,
  StyledGraphTitle,
  TitleLayout,
} from "./styles";
import { useObserveResize } from "../../hooks/useObserveResize";
import { DashboardGraph } from "../../../dashboard/dashboardGraphs/DashboardGraph";
import { ConditionalLink } from "../../ConditionalLink";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { Button } from "@nextui-org/react";
import { ForwardIcon } from "src/icons/ForwardIcon";
import { GraphInfo } from "src/components/dashboard/GraphInfo";
import { useShowCatalogDetail } from "src/components/detail/GraphDetails/Interactivtity/useShowCatalogDetail";

export const Graph = (props: {
  graphName: string;
  title?: string;
  to?: string;
  expanded?: boolean;
  info?: string;
  showCatalogHandler?: ReturnType<
    typeof useShowCatalogDetail
  >["showCatalogHandler"];
}) => {
  const { graphName, to, expanded, title, info, showCatalogHandler } = props;

  const navigate = useNavigate();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  const graphProps = {
    dimensions: dimensions ?? [0, 0],
    isFullInteractive: expanded,
    showCatalogHandler,
  };

  return (
    <StyledGraphCard $noBorder={expanded} $hasTitle={!!title}>
      {title && (
        <GraphCardHeaderLayout>
          <TitleLayout>
            <ConditionalLink condition={!!to} to={to}>
              <StyledGraphTitle>{title}</StyledGraphTitle>
            </ConditionalLink>
            {!!info && <GraphInfo info={info} />}
          </TitleLayout>
          <ConditionalLink condition={!!to} to={to}>
            <Button
              variant="light"
              color="success"
              className="text-black"
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
      <div ref={resizeContainerRef} className="relative">
        {renderGraph(
          <DashboardGraph graphName={graphName} graphProps={graphProps} />,
          dimensions
        )}
      </div>
    </StyledGraphCard>
  );
};
