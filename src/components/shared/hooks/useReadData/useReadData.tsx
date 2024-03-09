import { ExtendedFeatureCollection, group } from "d3";
import { SoundChartDataType } from "src/components/graphs/LineChart/lineChart.types";
import { SoundHeaders } from "src/data/sampleData/sampleData.types";
import { TemporalDataType } from "src/components/graphs/TimeLine/timeLine.types";
import {
  CleanDataFileHeaders,
  DataType,
  SensorsFileHeaders,
} from "src/data/data.types";
import { MapChartDataType } from "src/components/graphs/Map/map.types";
import { useGetFiltersData } from "../useGetFiltersData/useGetFiltersData";
import { useFetchJSON } from "./useFetchJson";
import { useFetchDSV } from "./useFetchDSV";
import { useApplyFilters } from "../useApplyFilters/useApplyFilters";

const useReadLineChartData = () => {
  const { data, loading } = useFetchDSV<SoundChartDataType, SoundHeaders>(
    ",",
    "/sampleData/testBioacustic.csv",
    (soundData) => {
      return {
        timeStamp: Number(soundData.timeStamp),
        soundMax: Number(soundData.soundMax),
        sensorID: soundData.sensorID,
      };
    }
  );

  return { data, loading };
};

const useReadMapData = () => {
  const { data, loading } = useFetchJSON<ExtendedFeatureCollection>(
    "/sampleData/sampleMap.geojson"
  );

  return { data, loading };
};

const useReadSensorsData = () => {
  const { data, loading } = useFetchDSV<MapChartDataType, SensorsFileHeaders>(
    ";",
    "/sampleData/sensors.csv",
    (sensorData) => {
      return {
        sensorId: sensorData.sensorId,
        latitude: Number(sensorData.latitude),
        longitude: Number(sensorData.longitude),
        observationsNum: Number(sensorData.observationsNum),
      };
    }
  );

  return { data, loading };
};

const useReadTimeLineData = () => {
  const { dataRef, data, setData, loading } = useFetchJSON<TemporalDataType[]>(
    "/sampleData/sampleTimelineData.json"
  );

  useApplyFilters(dataRef.current, setData);
  return { data, loading, readData: dataRef.current };
};

const arrayProperties: Array<CleanDataFileHeaders> = [
  "occurrenceID",
  "basisOfRecord",
  "eventDate",
  "AI Detection Method/Model",
  "Confidence%",
  "Verification Method",
  "Verification Name",
  "individualCount",
  "organismQuantity",
  "organismQuantityType",
  "decimalLatitude",
  "decimalLongitude",
  "geodeticDatum",
  "coordinateUncertaintyInMeters",
  "latitude",
  "longitude",
  "occurrenceRemarks",
  "references",
];

const useReadComplexData = () => {
  const { dataRef, data, setData, loading } = useFetchDSV<
    DataType,
    CleanDataFileHeaders
  >(";", "/sampleData/clean.csv", (dataEntry) => {
    const cleanEntry: DataType = dataEntry;
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
  const sensorsData = useReadSensorsData();
  const timeLineData = useReadTimeLineData();
  const complexData = useReadComplexData();
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
    sensorsData,
    complexData,
    taxonomicClassification: {
      data: taxonomicClassification,
      loading: complexData.loading,
    },
    filtersData,
  };
};
