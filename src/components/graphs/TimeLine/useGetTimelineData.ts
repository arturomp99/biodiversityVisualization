import { useEffect, useState } from "react";
import { useDataContext } from "src/contexts/dataContext";
import { TimelineChartDataType } from "../graphsData.types";
import { LegendFilterType } from "./TimeLineGraph";

export const useGetTimelineData = (legendFilter?: LegendFilterType) => {
  const {
    complexData: { data, loading },
  } = useDataContext();
  const [timelineData, setTimelineData] = useState<
    TimelineChartDataType[] | undefined
  >();

  useEffect(() => {
    if (!data) return;
    const flatData = data.flatMap((dataPoint) =>
      dataPoint.eventDate.map((dataPointDate) => ({
        ...dataPoint,
        eventDate: dataPointDate,
      }))
    );
    const groupKey: typeof legendFilter = legendFilter ?? "class";
    const sortedFlatData = flatData.sort((dataPointA, dataPointB) => {
      if (dataPointA[groupKey] < dataPointB[groupKey]) return -1;
      if (dataPointA[groupKey] > dataPointB[groupKey]) return 1;
      return (
        new Date(dataPointA.eventDate).getTime() -
        new Date(dataPointB.eventDate).getTime()
      );
    });
    setTimelineData(() => sortedFlatData);
  }, [data, legendFilter]);

  return { data: timelineData, loading };
};
