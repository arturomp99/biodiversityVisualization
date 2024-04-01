import React, { useEffect, useState } from "react";
import { LineChart, LineChartDataType } from "src/components/graphs";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { useDataContext } from "src/contexts/dataContext";
import { StyledDetailChart } from "../styles";
import { getLinechartData } from "./getLinechartData";
import { lineChartParameters } from "src/data/constants";

export const TimeLineDetails = () => {
  const {
    complexData: { data, loading },
  } = useDataContext();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();
  const [linechartData, setLinechartData] = useState<LineChartDataType[]>();

  useEffect(() => setLinechartData(getLinechartData(data)), [data]);

  return (
    <StyledDetailChart ref={resizeContainerRef}>
      {!loading &&
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
