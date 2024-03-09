import React, { FC } from "react";
import { LineChart } from "src/components/graphs";
import { GraphProps } from "src/components/graphs/graphsProps.types";
import { useDataContext } from "src/contexts/dataContext";

export const SoundChart: FC<
  Pick<GraphProps, "isBasicInteractive" | "dimensions">
> = ({ isBasicInteractive, dimensions }) => {
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
        />
      ) : (
        <div>LOADING LINE CHART DATA...</div>
      )}
    </>
  );
};
