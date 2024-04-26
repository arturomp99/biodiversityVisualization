import React, { useMemo } from "react";
import { GaugeChart } from "src/components/graphs/GaugeChart/GaugeChart";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";

type MethodsIndicatorProps = {
  count: number;
  total: number;
};

export const MethodsIndicator = (props: MethodsIndicatorProps) => {
  const { count, total } = props;

  const data = useMemo(() => ({ count, totalCount: total }), [count, total]);
  const { containerRef, dimensions } = useObserveResize();
  return (
    <div ref={containerRef}>
      {renderGraph(
        <GaugeChart dimensions={dimensions ?? [0, 0]} data={data} />,
        dimensions
      )}
    </div>
  );
};
