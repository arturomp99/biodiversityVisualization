import React, { FC } from "react";
import { GraphProps, LineChart } from "src/components/graphs";
import { useDataContext } from "src/contexts/dataContext";

export const SoundChart: FC<GraphProps> = ({
  isBasicInteractive,
  dimensions,
  isFullInteractive,
}) => {
  const {
    lineChartData: { data, loading },
  } = useDataContext();

  return (
    <>
      {!loading && !!data ? (
        <LineChart
          isBasicInteractive={isBasicInteractive}
          dimensions={dimensions}
          data={data}
          isBrushInteractive={isFullInteractive}
          isCursorInteractive={isFullInteractive}
          shouldAddLegend
        />
      ) : (
        <div>LOADING LINE CHART DATA...</div>
      )}
    </>
  );
};
