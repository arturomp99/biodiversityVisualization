import { ExtendedFeatureCollection, group } from "d3";
import config from "src/config.json";
import { DataType, PositionsFileHeaders } from "src/data/data.types";
import { useFetchDSV } from "./useFetchDSV";
import { useApplyFilters } from "../useApplyFilters/useApplyFilters";
import { MapChartDataType } from "src/components/graphs/graphsData.types";
import { useFetch } from "./useFetch";
import { FiltersDataType } from "./types";

const useReadGeoJsonData = (filePath: string) => {
  const { data, loading } = useFetch<ExtendedFeatureCollection[]>(filePath);

  return { data, loading };
};

const useReadPositionsData = (fileName: string) => {
  const { data, loading } = useFetchDSV<MapChartDataType, PositionsFileHeaders>(
    ",",
    fileName,
    (positionData) => {
      return {
        Id: positionData.occurrenceID.split(","),
        latitude: Number(positionData.decimalLatitude),
        longitude: Number(positionData.decimalLongitude),
        scientificNames: positionData.scientificName.split(","),
        observationsNum: Number(positionData.observationsNum),
      };
    }
  );

  return { data, loading };
};

const useReadComplexData = () => {
  const { dataRef, data, setData, loading } = useFetch<DataType[]>(
    config.BACKEND_URL + config.DATA_KEY
  );

  useApplyFilters(dataRef.current, setData);

  return { data, loading, readData: dataRef.current };
};

export const useReadData = () => {
  const detectionsPositionsData = useReadPositionsData(
    "/sampleData/positions.csv"
  );
  const complexData = useReadComplexData();
  const geoJsonData = useReadGeoJsonData(
    config.BACKEND_URL + config.GEOJSON_KEY
  );

  const { data: readFiltersData } = useFetch<FiltersDataType>(
    config.BACKEND_URL + config.FILTERS_KEY
  );
  const filtersData = {
    ...readFiltersData,
    temporal:
      !!readFiltersData?.temporal &&
      !!readFiltersData?.temporal[0] &&
      !!readFiltersData?.temporal[1]
        ? [
            new Date(readFiltersData?.temporal[0]),
            new Date(readFiltersData?.temporal[1]),
          ]
        : readFiltersData?.temporal,
  };

  const taxonomicClassification = !complexData.data
    ? undefined
    : group(
        complexData.data,
        (specimen) => specimen.phylum,
        (specimen) => specimen.class,
        (specimen) => specimen.order,
        (specimen) => specimen.family,
        (specimen) => specimen.genus,
        (specimen) => specimen.species,
        (specimen) => specimen.scientificName
      );

  return {
    detectionsPositionsData,
    complexData,
    taxonomicClassification: {
      data: taxonomicClassification,
      loading: complexData.loading,
    },
    filtersData,
    geoJsonData,
  };
};
