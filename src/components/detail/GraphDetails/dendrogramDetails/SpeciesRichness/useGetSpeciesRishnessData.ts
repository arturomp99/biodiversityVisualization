import { useEffect, useState } from "react";
import { BarChartDataType } from "src/components/graphs";
import { useDataContext } from "src/contexts/dataContext";

export const useGetSpeciesRichnessData = () => {
  const { complexData } = useDataContext();
  const [speciesRichnessData, setSpeciesRichnessData] = useState<
    BarChartDataType[] | undefined
  >();
  useEffect(() => {
    setSpeciesRichnessData((previousData) => {
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

  return { data: speciesRichnessData, loading: complexData.loading };
};
