import React, { useEffect, useState } from "react";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { useDataContext } from "src/contexts/dataContext";
import { getLinechartData } from "./getLinechartData";
import { StyledDetailChart } from "../styles";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { LineChart, LineChartDataType } from "src/components/graphs";
import { lineChartParameters } from "src/data/constants";

export const MapDetails = () => {
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
            isBasicInteractive
            dimensions={dimensions ?? [0, 0]}
            data={linechartData}
            axisTitles={["", "observations"]}
            axesParameters={{
              ...lineChartParameters.axesParameters,
              grid: false,
            }}
            shouldAddLegend
          />,
          dimensions
        )}
    </StyledDetailChart>
  );
};
