import React, { Key, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { capitalize } from "lodash";
import { GraphInfo } from "src/components/dashboard/GraphInfo";
import { ConditionalLink } from "src/components/shared/ConditionalLink";
import { StyledGraphCard } from "src/components/shared/containers/Card";
import {
  GraphCardHeaderLayout,
  StyledGraphTitle,
  TitleLayout,
} from "src/components/shared/containers/Card/styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { DownArrow, ForwardIcon } from "src/icons";
import { renderGraph } from "../shared/utils/renderGraph";
import { TimeLine } from "./TimeLine";
import { TimeLineLegend } from "./TimeLineLegend/TimeLineLegend";
import { useGetTimelineData } from "./useGetTimelineData";
import { useGetTimelineColorScale } from "./useGetTimelineColorScale";
import { useDataContext } from "src/contexts/dataContext";
import type { TaxonomicLevelsType } from "src/data/data.types";

const TimeLineContainer = styled.div<{ $isLegendPresent?: boolean }>`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${({ $isLegendPresent }) =>
    $isLegendPresent ? "80% 20%" : "100%"};
  align-items: stretch;
`;

export type LegendFilterType = TaxonomicLevelsType;

export const TimeLineGraph = (props: {
  title?: string;
  to?: string;
  expanded?: boolean;
  info?: string;
}) => {
  const { to, expanded, title, info } = props;

  const { filtersData } = useDataContext();

  const navigate = useNavigate();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  const [legendFilter, setLegendFilter] = useState<LegendFilterType>("class");

  const { data, loading } = useGetTimelineData(legendFilter);
  const { colorScale, keys } = useGetTimelineColorScale(data, legendFilter);

  const [hoveredLegendEntry, setHoveredLegendEntry] = useState<string>();

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
          {!expanded && (
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
          )}
        </GraphCardHeaderLayout>
      )}
      {
        <TimeLineContainer $isLegendPresent>
          <div ref={resizeContainerRef}>
            {!!data &&
              !loading &&
              renderGraph(
                <TimeLine
                  dimensions={dimensions ?? [0, 0]}
                  data={data}
                  colorScale={colorScale}
                  groupKey={legendFilter}
                  legendHover={data
                    .filter((dataEntry) => {
                      return dataEntry[legendFilter] === hoveredLegendEntry;
                    })
                    .map((dataEntry) => dataEntry.species)}
                />,
                dimensions
              )}
          </div>
          {!!data && colorScale && keys && (
            <div className="relative mx-auto">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    color="success"
                    className="text-black"
                    startContent={<DownArrow />}
                  >
                    {capitalize(legendFilter)}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="select legend filter"
                  onAction={(key: Key) =>
                    setLegendFilter(key as LegendFilterType)
                  }
                >
                  {Object.keys(filtersData.taxonomic ?? {})
                    .slice(0, -2)
                    .map((taxonomicKey) => (
                      <DropdownItem key={taxonomicKey}>
                        {capitalize(taxonomicKey)}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
              <hr />
              <TimeLineLegend
                keys={keys}
                colorScale={colorScale}
                onEntryHover={setHoveredLegendEntry}
              />
            </div>
          )}
        </TimeLineContainer>
      }
    </StyledGraphCard>
  );
};
