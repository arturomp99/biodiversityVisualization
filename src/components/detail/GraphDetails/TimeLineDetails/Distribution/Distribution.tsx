import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { Key, useEffect, useMemo, useState } from "react";
import { uniq, capitalize } from "lodash";
import { scaleOrdinal } from "d3";
import { StyledGraphCard } from "src/components/shared/containers/Card";
import { DownArrow } from "src/icons";
import { StyledDetailChart } from "../../styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { useDataContext } from "src/contexts/dataContext";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { Histogram } from "src/components/graphs/Histogram/Histogram";
import {
  HistogramDataType,
  HistogramProps,
  LineChart,
  LineChartDataType,
} from "src/components/graphs";
import { getLinechartData } from "../getLinechartData";
import { histogramParameters, lineChartParameters } from "src/data/constants";
import { DataType } from "src/data/data.types";
import { DistributionLegend } from "./Legend/DistributionLegend";

export const Distribution = ({
  isHistogram,
  onHover,
  isObservations,
  isFullInteractive,
  onBarClick,
}: {
  isHistogram: boolean;
  onHover: (hoveredSpecies: string[]) => void;
  isObservations?: boolean;
  isFullInteractive?: boolean;
  onBarClick?: (names: string[]) => void;
}) => {
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();
  const type = isObservations ? "observations" : "species";
  const {
    complexData: { data, loading },
  } = useDataContext();

  const [selectedDropdown, setSelectedDropdown] = useState<string>(
    `Total ${type}`
  );
  const [linechartData, setLinechartData] = useState<LineChartDataType[]>();

  useEffect(() => {
    setLinechartData(getLinechartData(data, isObservations));
  }, [data, dimensions]);

  const stackFunction = useMemo<
    ((dataPoint: HistogramDataType<DataType>) => string) | undefined
  >(() => {
    if (selectedDropdown === `${capitalize(type)} per location`)
      return (dataPoint: HistogramDataType<DataType>) =>
        `${dataPoint.position[0].latitude} ${dataPoint.position[0].longitude}`;
    else if (selectedDropdown === `${capitalize(type)} per DROP`)
      return (dataPoint: HistogramDataType<DataType>) => dataPoint.dropId;
    else if (selectedDropdown === `${capitalize(type)} per detection method`)
      return (dataPoint: HistogramDataType<DataType>) =>
        dataPoint.identifiedBy[0];
    return undefined;
  }, [selectedDropdown]);

  const [colorScale, setColorScale] =
    useState<HistogramProps<DataType>["colorScale"]>();
  useEffect(
    () =>
      setColorScale((prevColorScale: HistogramProps<DataType>["colorScale"]) =>
        data
          ? stackFunction
            ? scaleOrdinal<string>()
                .domain(uniq(data.map((dataRow) => stackFunction(dataRow))))
                .range(histogramParameters.stacked.colorScheme)
            : undefined
          : prevColorScale
      ),
    [stackFunction, data]
  );

  return (
    <StyledGraphCard $noHover>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            color="success"
            className="text-black"
            startContent={<DownArrow />}
          >
            {selectedDropdown}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="species distribution"
          onAction={(key: Key) => setSelectedDropdown(key as string)}
        >
          <DropdownItem key={`Total ${type}`}>{`Total ${type}`}</DropdownItem>
          <DropdownItem key={`${capitalize(type)} per location`}>
            {`${capitalize(type)} per location`}
          </DropdownItem>
          <DropdownItem key={`${capitalize(type)} per DROP`}>{`${capitalize(
            type
          )} per DROP`}</DropdownItem>
          <DropdownItem
            key={`${capitalize(type)} per detection method`}
          >{`${capitalize(type)} per detection method`}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <StyledDetailChart ref={resizeContainerRef}>
        {isHistogram
          ? !loading &&
            !!data &&
            renderGraph(
              <Histogram
                dimensions={dimensions ?? [0, 0]}
                data={data}
                onHover={onHover}
                reducerFunction={
                  isObservations
                    ? (dataPoint: HistogramDataType<DataType>[]) =>
                        dataPoint.reduce<number>((acc: number, curr) => {
                          acc += curr.observationsNum;
                          return acc;
                        }, 0)
                    : undefined
                }
                stackFunction={stackFunction}
                colorScale={colorScale}
                isFullInteractive={isFullInteractive}
                onBarClick={onBarClick}
              />,
              dimensions
            )
          : !loading &&
            !!linechartData &&
            renderGraph(
              <LineChart
                dimensions={dimensions ?? [0, 0]}
                data={linechartData}
                axisTitles={["", "observations"]}
                axesParameters={{
                  ...lineChartParameters.axesParameters,
                  grid: false,
                }}
              />,
              dimensions
            )}
      </StyledDetailChart>
      {data && stackFunction && (
        <DistributionLegend
          keys={uniq(data.map((dataPoint) => stackFunction(dataPoint)))}
          colorScale={colorScale}
        />
      )}
    </StyledGraphCard>
  );
};
