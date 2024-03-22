import { ExtendedFeatureCollection, group } from "d3";
import { SoundHeaders } from "src/data/sampleData/sampleData.types";
import {
  CleanDataFileHeaders,
  DataType,
  PositionsFileHeaders,
} from "src/data/data.types";
import { useGetFiltersData } from "../useGetFiltersData/useGetFiltersData";
import { useFetchJSON } from "./useFetchJson";
import { useFetchDSV } from "./useFetchDSV";
import { useApplyFilters } from "../useApplyFilters/useApplyFilters";
import {
  LineChartDataType,
  MapChartDataType,
  TimelineChartDataType,
} from "src/components/graphs/graphsData.types";

const useReadLineChartData = () => {
  const { dataRef, data, loading, setData } = useFetchDSV<
    LineChartDataType,
    SoundHeaders
  >(",", "/sampleData/testBioacustic.csv", (soundData) => {
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

const useReadTimeLineData = () => {
  const { dataRef, data, setData, loading } = useFetchJSON<
    TimelineChartDataType[]
  >("/sampleData/sampleTimelineData.json");

  useApplyFilters(dataRef.current, setData);
  return { data, loading, readData: dataRef.current };
};

const arrayProperties: Array<CleanDataFileHeaders> = [
  "occurrenceID",
  "basisOfRecord",
  "eventDate",
  "identifiedBy",
  "AI Detection Method/Model",
  "Confidence%",
  "Verification Method",
  "Verification Name",
  "dateIdentified",
  "individualCount",
  "organismQuantity",
  "organismQuantityType",
  "decimalLatitude",
  "decimalLongitude",
  "geodeticDatum",
  "coordinateUncertaintyInMeters",
  "verbatimCoordinates",
  "verbatimCoordinateSystem",
  "occurrenceRemarks",
  "references",
];

const useReadComplexData = () => {
  const { dataRef, data, setData, loading } = useFetchDSV<
    DataType,
    CleanDataFileHeaders
  >(",", "/sampleData/clean_IdentifiedSpeciesTime.csv", (dataEntry) => {
    const cleanEntry: DataType = { ...dataEntry };
    for (const property of arrayProperties) {
      cleanEntry[property] = dataEntry[property].split(",") as string[];
    }
    return cleanEntry;
  });

  useApplyFilters(dataRef.current, setData);

  return { data, loading, readData: dataRef.current };
};

export const useReadData = () => {
  const lineChartData = useReadLineChartData();
  const mapData = useReadMapData();
  const detectionsPositionsData = useReadPositionsData(
    "/sampleData/positions.csv"
  );
  console.log("arturo detectionsPositionsData", detectionsPositionsData);
  const timeLineData = useReadTimeLineData();
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

  const filtersData = useGetFiltersData(complexData, lineChartData);

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
    timeLineData,
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
