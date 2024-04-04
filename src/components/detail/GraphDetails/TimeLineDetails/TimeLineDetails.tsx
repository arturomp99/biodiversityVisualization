import React, { useCallback, useEffect, useState } from "react";
import { LineChart, LineChartDataType } from "src/components/graphs";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { useDataContext } from "src/contexts/dataContext";
import { StyledDetailChart } from "../styles";
import { getLinechartData } from "./getLinechartData";
import { lineChartParameters } from "src/data/constants";
import { Histogram } from "src/components/graphs/Histogram/Histogram";
import { useDetailInteractionContext } from "src/contexts/detailInteractionContext";

export const TimeLineDetails = ({ isHistogram }: { isHistogram: boolean }) => {
  const {
    complexData: { data, loading },
  } = useDataContext();
  const { setTimelineHover } = useDetailInteractionContext();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();
  const [linechartData, setLinechartData] = useState<LineChartDataType[]>();

  useEffect(() => {
    setLinechartData(getLinechartData(data));
  }, [data, dimensions]);

  const onTimelineDetailsInteraction = useCallback(
    (hoveredSpecies: string[]) => {
      setTimelineHover && setTimelineHover(hoveredSpecies);
    },
    [setTimelineHover]
  );

  return (
    <StyledDetailChart ref={resizeContainerRef}>
      {isHistogram
        ? !loading &&
          !!data &&
          renderGraph(
            <Histogram
              dimensions={dimensions ?? [0, 0]}
              data={data}
              onHover={onTimelineDetailsInteraction}
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
  );
};
