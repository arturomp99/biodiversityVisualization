import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import { BarChart } from "src/components/graphs/BarChart/BarChart";
import { StyledDetailChart } from "./styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { useDataContext } from "src/contexts/dataContext";
import { TreeDataType } from "src/components/graphs/Dendrogram/dendrogram.types";
import { BarChartDataType } from "src/components/graphs/BarChart/BarChart.types";

export const DendrogramDetails = () => {
  const {
    taxonomicClassification: { data, loading },
  } = useDataContext();

  const [barChartData, setBarChartData] = useState<BarChartDataType[]>();

  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();

  useEffect(() => {
    if (!data) {
      return;
    }
    const root = d3.hierarchy<TreeDataType>(data);
    root.count();
    setBarChartData(() =>
      root.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.map((child: any) => {
          return { id: child.data[0], count: child.value || 0 };
        })
        .sort((b, a) => b.count - a.count)
    );
  }, [data]);

  return (
    <StyledDetailChart ref={resizeContainerRef}>
      {!loading &&
        !!barChartData &&
        renderGraph(
          <BarChart
            dimensions={dimensions ?? [0, 0]}
            isBasicInteractive
            data={barChartData}
          />,
          dimensions
        )}
    </StyledDetailChart>
  );
};
