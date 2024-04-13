import React, { FC, useEffect, useRef, useState } from "react";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { useDataContext } from "src/contexts/dataContext";
import { getLinechartData } from "./getLinechartData";
import { StyledDetailChart } from "../styles";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { LineChart, LineChartDataType } from "src/components/graphs";
import { lineChartParameters } from "src/data/constants";
import { Catalog } from "src/components/catalog/Catalog";
import { StyledDivider, StyledTitle } from "./styles";
import { DataType } from "src/data/data.types";

export const MapDetails: FC<{
  catalogScientificNames?: DataType["scientificName"][];
}> = ({ catalogScientificNames }) => {
  const {
    complexData: { data, loading },
  } = useDataContext();
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const [linechartData, setLinechartData] = useState<LineChartDataType[]>();

  useEffect(() => setLinechartData(getLinechartData(data)), [data]);

  useEffect(() => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [catalogScientificNames]);
  return (
    <>
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
      {catalogScientificNames && (
        <div ref={catalogRef}>
          <StyledDivider />
          <StyledTitle>Catalog of observations</StyledTitle>
          <Catalog catalogScientificNames={catalogScientificNames} />
        </div>
      )}
    </>
  );
};
