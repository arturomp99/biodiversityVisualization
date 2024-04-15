import { useEffect, useState } from "react";
import { useDataContext } from "src/contexts/dataContext";
import { TimelineChartDataType } from "../graphsData.types";

export const useGetTimelineData = () => {
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
    const sortedFlatData = flatData.sort((dataPointA, dataPointB) => {
      if (dataPointA.class < dataPointB.class) return -1;
      if (dataPointA.class > dataPointB.class) return 1;
      return (
        new Date(dataPointA.eventDate).getTime() -
        new Date(dataPointB.eventDate).getTime()
      );
    });
    setTimelineData(() => sortedFlatData);
  }, [data]);

  return { data: timelineData, loading };
};
