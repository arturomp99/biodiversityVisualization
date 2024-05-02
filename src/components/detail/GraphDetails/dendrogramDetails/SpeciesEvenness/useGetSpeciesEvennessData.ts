import { useEffect, useState } from "react";
import { BarChartDataType } from "src/components/graphs";
import { useDataContext } from "src/contexts/dataContext";

export const useGetSpeciesEvennessData = () => {
  const { complexData } = useDataContext();
  const [speciesEvennessData, setSpeciesEvennessData] = useState<
    BarChartDataType[] | undefined
  >();
  useEffect(() => {
    setSpeciesEvennessData((previousData) => {
      if (!complexData.data) {
        return previousData;
      }
      const data = complexData.data
        .map((dataObservation) => ({
          id: dataObservation.scientificName,
          count: dataObservation.observationsNum,
        }))
        .sort((a, b) => b.count - a.count);
      return data;
    });
  }, [complexData.data]);

  return { data: speciesEvennessData, loading: complexData.loading };
};
