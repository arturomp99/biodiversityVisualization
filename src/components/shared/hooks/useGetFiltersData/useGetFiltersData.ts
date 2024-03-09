import { useEffect, useState } from "react";
import { DataType } from "src/data/data.types";
import {
  TaxonomicFiltersDataType,
  asyncGetTaxonomicFiltersData,
} from "./asyncGetTaxonomicFiltersData";
import { asyncGetTimeFiltersData } from "./asyncGetTimeFiltersData";
import { SoundChartDataType } from "src/components/graphs/LineChart/lineChart.types";

export const useGetFiltersData = <
  DataT extends {
    readData?: DataType[];
    loading: boolean;
  },
  TemporalDataT extends {
    readData?: SoundChartDataType[];
    loading: boolean;
  }
>(
  data: DataT,
  temporalData: TemporalDataT
) => {
  const [filtersData, setFiltersData] = useState<{
    taxonomic: TaxonomicFiltersDataType | undefined;
  }>();

  useEffect(() => {
    if (
      data.loading ||
      !data.readData ||
      temporalData.loading ||
      !temporalData.readData
    ) {
      return;
    }
    asyncGetTaxonomicFiltersData(data.readData).then((collectedFiltersData) => {
      setFiltersData((previousFiltersData) => ({
        ...previousFiltersData,
        taxonomic: { data: collectedFiltersData, loading: false },
      }));
    });
    asyncGetTimeFiltersData(temporalData.readData);
  }, [
    data.loading,
    data.readData,
    temporalData.loading,
    temporalData.readData,
  ]);

  return filtersData;
};
