import { ExtendedFeatureCollection } from "d3-geo";
import { group } from "d3-array";
import config from "src/config.json";
import { DataType } from "src/data/data.types";
import { useApplyFilters } from "../useApplyFilters/useApplyFilters";
import { MapChartDataType } from "src/components/graphs/graphsData.types";
import { useFetch } from "./useFetch";
import { FiltersDataType } from "./types";
import { useEffect, useState } from "react";

const useReadGeoJsonData = (filePath: string) => {
  const { data, loading } = useFetch<ExtendedFeatureCollection[]>(filePath);

  return { data, loading };
};

const useGetPositionsData = (
  data: DataType[] | undefined
): { data: MapChartDataType[] | undefined; loading: boolean } => {
  const [positionsData, setPositionsData] = useState<MapChartDataType[]>();

  useEffect(() => {
    if (!data) {
      return;
    }
    setPositionsData(() => {
      const positionsData = data.reduce<MapChartDataType[]>(
        (acc: MapChartDataType[], curr) => {
          const duplicateCurr = { ...curr };
          duplicateCurr.position.forEach((currentPosition) => {
            const existingPosition = acc.find(
              (observation) =>
                observation.latitude === +currentPosition.latitude &&
                observation.longitude === +currentPosition.longitude
            );
            existingPosition
              ? existingPosition.observations.push(curr)
              : acc.push({
                  latitude: +duplicateCurr.position[0].latitude,
                  longitude: +duplicateCurr.position[0].longitude,
                  observations: [curr],
                });
          });
          return acc;
        },
        []
      );
      return positionsData;
    });
  }, [data]);

  return { data: positionsData, loading: !positionsData };
};

const useReadComplexData = () => {
  const { dataRef, data, setData, loading } = useFetch<DataType[]>(
    config.BACKEND_URL + config.DATA_KEY
  );

  useApplyFilters(dataRef.current, setData);

  return { data, loading, readData: dataRef.current };
};

export const useReadData = () => {
  const complexData = useReadComplexData();
  const detectionsPositionsData = useGetPositionsData(complexData.data);
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
