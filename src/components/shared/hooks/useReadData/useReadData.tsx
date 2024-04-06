import { ExtendedFeatureCollection, group } from "d3";
import config from "src/config.json";
import { SoundHeaders } from "src/data/sampleData/sampleData.types";
import { DataType, PositionsFileHeaders } from "src/data/data.types";
import { useGetFiltersData } from "../useGetFiltersData/useGetFiltersData";
import { useFetchJSON } from "./useFetchJson";
import { useFetchDSV } from "./useFetchDSV";
import { useApplyFilters } from "../useApplyFilters/useApplyFilters";
import {
  LineChartDataType,
  MapChartDataType,
} from "src/components/graphs/graphsData.types";
import { useFetch } from "./useFetch";

const useReadLineChartData = () => {
  const { dataRef, data, loading, setData } = useFetchDSV<
    LineChartDataType,
    SoundHeaders
  >(",", "/sampleData/bioacoustic.csv", (soundData) => {
    return {
      timeStamp: Number(soundData.timeStamp),
      value: Number(soundData.soundMax),
      group: soundData.sensorID,
    };
  });

  useApplyFilters(dataRef.current, setData);

  return { data, loading, readData: dataRef.current };
};

const useReadMapData = () => {
  const { data, loading } = useFetchJSON<ExtendedFeatureCollection>(
    "/geoJson/Singapore.geojson"
  );

  return { data, loading };
};

const useReadGeoJsonData = (filePath: string) => {
  const { data, loading } = useFetchJSON<ExtendedFeatureCollection>(filePath);

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
  const { dataRef, data, setData, loading } = useFetch<DataType>(
    config.BACKEND_URL + config.DATA_KEY
  );

  useApplyFilters(dataRef.current, setData);

  return { data, loading, readData: dataRef.current };
};

export const useReadData = () => {
  const lineChartData = useReadLineChartData();
  const mapData = useReadMapData();
  const detectionsPositionsData = useReadPositionsData(
    "/sampleData/positions.csv"
  );
  console.log(config.BACKEND_URL + config.DATA_KEY);
  fetch(config.BACKEND_URL + config.GEOJSON_KEY).then((response) =>
    response.json().then(() => console.log("arturo geojson response", response))
  );
  const complexData = useReadComplexData();
  const geoJsonData = {
    dronePaths: [
      useReadGeoJsonData("/geoJson/dronePath0.geojson"),
      useReadGeoJsonData("/geoJson/dronePath1.geojson"),
      useReadGeoJsonData("/geoJson/dronePath2.geojson"),
      useReadGeoJsonData("/geoJson/dronePath3.geojson"),
      useReadGeoJsonData("/geoJson/dronePath4.geojson"),
      useReadGeoJsonData("/geoJson/dronePath5.geojson"),
      useReadGeoJsonData("/geoJson/dronePath6.geojson"),
      useReadGeoJsonData("/geoJson/dronePath7.geojson"),
      useReadGeoJsonData("/geoJson/dronePath8.geojson"),
      useReadGeoJsonData("/geoJson/dronePath9.geojson"),
    ],
  };

  const filtersData = useGetFiltersData(complexData);

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
    lineChartData,
    mapData,
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
