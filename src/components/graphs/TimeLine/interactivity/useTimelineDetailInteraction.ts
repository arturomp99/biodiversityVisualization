import { useEffect } from "react";
import * as d3 from "d3";
import { useDetailInteractionContext } from "src/contexts/detailInteractionContext";
import { TimelineChartPointType } from "../..";
import { timelineClassNames } from "src/data/idClassNames";
import { timeLineParameters } from "src/data/constants";

export const useTimelineDetailInteraction = (
  parentRef: React.RefObject<SVGSVGElement>
) => {
  const { timelineHover } = useDetailInteractionContext();

  useEffect(() => {
    if (!parentRef) {
      return;
    }
    d3.select(parentRef.current)
      .selectAll<SVGRectElement, TimelineChartPointType>(
        `.${timelineClassNames.marker}`
      )
      .attr("fill-opacity", (dataPoint) =>
        timelineHover.length !== 0
          ? timelineHover.includes(dataPoint.key)
            ? "1"
            : timeLineParameters.detailInteraction.unhoveredOpacity
          : "1"
      );
  }, [timelineHover, parentRef.current]);
};
