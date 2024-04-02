import React, { useEffect, useState } from "react";
import { LineChart, LineChartDataType } from "src/components/graphs";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { useDataContext } from "src/contexts/dataContext";
import { StyledDetailChart } from "../styles";
import { getLinechartData } from "./getLinechartData";
import { lineChartParameters } from "src/data/constants";
import { Histogram } from "src/components/graphs/Histogram/Histogram";

export const TimeLineDetails = ({ isHistogram }: { isHistogram: boolean }) => {
  const {
    complexData: { data, loading },
  } = useDataContext();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();
  const [linechartData, setLinechartData] = useState<LineChartDataType[]>();

  useEffect(() => {
    setLinechartData(getLinechartData(data));
  }, [data, dimensions]);

  return (
    <StyledDetailChart ref={resizeContainerRef}>
      {isHistogram
        ? !loading &&
          !!data &&
          renderGraph(
            <Histogram
              dimensions={dimensions ?? [0, 0]}
              data={data}
              // xExtent={histogramData.xExtent}
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
