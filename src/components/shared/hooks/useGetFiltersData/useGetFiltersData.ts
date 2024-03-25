import { useEffect, useState } from "react";
import { DataType } from "src/data/data.types";
import {
  TaxonomicFiltersDataType,
  asyncGetTaxonomicFiltersData,
} from "./asyncGetTaxonomicFiltersData";
import {
  TimeFiltersDataType,
  asyncGetTimeFiltersData,
} from "./asyncGetTimeFiltersData";
import { LineChartDataType } from "src/components/graphs";

export const useGetFiltersData = <
  DataT extends {
    readData?: DataType[];
    loading: boolean;
  },
  TemporalDataT extends {
    readData?: LineChartDataType[];
    loading: boolean;
  }
>(
  data: DataT,
  temporalData?: TemporalDataT
) => {
  const [filtersData, setFiltersData] = useState<{
    taxonomic?: TaxonomicFiltersDataType;
    temporal?: TimeFiltersDataType;
  }>();

  useEffect(() => {
    if (data.loading || !data.readData) {
      return;
    }
    asyncGetTaxonomicFiltersData(data.readData).then((collectedFiltersData) => {
      setFiltersData((previousFiltersData) => ({
        ...previousFiltersData,
        taxonomic: { data: collectedFiltersData, loading: false },
      }));
    });
    asyncGetTimeFiltersData(data.readData, temporalData?.readData).then(
      (collectedFiltersData) => {
        setFiltersData((previousFiltersData) => ({
          ...previousFiltersData,
          temporal: { data: collectedFiltersData, loading: false },
        }));
      }
    );
  }, [
    data.loading,
    data.readData,
    temporalData?.loading,
    temporalData?.readData,
  ]);

  return filtersData;
};
