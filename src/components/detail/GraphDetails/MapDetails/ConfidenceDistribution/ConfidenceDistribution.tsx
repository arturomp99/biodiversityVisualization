import React, { useEffect, useState } from "react";
import { StyledGraphCard } from "src/components/shared/containers/Card";
import { StyledGraphTitle } from "src/components/shared/containers/Card/styles";
import { StyledDetailChart } from "../../styles";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { useDataContext } from "src/contexts/dataContext";
import { NumericHistogramProps } from "src/components/graphs";
import { DataType } from "src/data/data.types";
import { NumericHistogram } from "src/components/graphs/Histogram/NumericHistogram/NumericHistogram";

export const ConfidenceDistribution = () => {
  const { containerRef: resizeContainerRef, dimensions } = useObserveResize();
  const [histogramData, setHistogramData] =
    useState<NumericHistogramProps<DataType>["data"]>();
  const {
    complexData: { data, loading },
  } = useDataContext();

  useEffect(() => {
    setHistogramData(() => {
      if (!data) {
        return;
      }
      const flattenedData = data.flatMap((dataRow) =>
        dataRow["Confidence%"].map((dataRowConfidence) => {
          return {
            ...dataRow,
            "Confidence%": dataRowConfidence,
          } as unknown as NumericHistogramProps<DataType>["data"][0];
        })
      );
      return flattenedData;
    });
  }, [data]);

  return (
    <StyledGraphCard $noHover>
      <StyledGraphTitle>Confidence of detections</StyledGraphTitle>
      <StyledDetailChart ref={resizeContainerRef} $height="40vh">
        {!loading &&
          !!histogramData &&
          renderGraph(
            <NumericHistogram
              dimensions={dimensions ?? [0, 0]}
              data={histogramData}
              binFunction={(dataPoint) => +(dataPoint["Confidence%"] || 0)}
            />,
            dimensions
          )}
      </StyledDetailChart>
    </StyledGraphCard>
  );
};
