import { useEffect, useState } from "react";
import {
  DSVRowString,
  ExtendedFeatureCollection,
  csv,
  json,
  dsv,
  group,
} from "d3";
import { TreeDataType } from "src/components/graphs/Dendrogram/dendrogram.types";
import { SoundChartDataType } from "src/components/graphs/LineChart/lineChart.types";
import { SoundHeaders } from "src/data/sampleData/sampleData.types";
import { TemporalDataType } from "src/components/graphs/TimeLine/timeLine.types";
import { CleanDataFileHeaders, SensorsFileHeaders } from "src/data/data.types";
import { MapChartDataType } from "src/components/graphs/Map/map.types";

const useReadDendrogramData = () => {
  const [data, setData] = useState<TreeDataType | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readData: TreeDataType | undefined = await json(
          "/sampleData/sampleDendrogramData.json"
        );
        if (!readData) throw "empty data";
        setData(readData);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return console.log("Error loading the data\n", error);
      }
    };
    fetchData();
  }, []);
  return { data, loading };
};

const useReadLineChartData = () => {
  const [data, setData] = useState<SoundChartDataType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readData = await csv(
          "/sampleData/testBioacustic.csv",
          (soundData: DSVRowString<SoundHeaders>) => {
            return {
              timeStamp: Number(soundData.timeStamp),
              soundMax: Number(soundData.soundMax),
              sensorID: soundData.sensorID,
            };
          }
        );
        if (!readData) throw "empty data";
        setLoading(false);
        setData(Array.from(readData));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return console.log("Error loading the data\n", error);
      }
    };
    fetchData();
  }, []);
  return { data, loading };
};

const useReadMapData = () => {
  const [data, setData] = useState<ExtendedFeatureCollection | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readData: ExtendedFeatureCollection | undefined = await json(
          "/sampleData/sampleMap.geojson"
        );
        if (!readData) throw "empty data";
        setData(readData);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return console.log("Error loading the data\n", error);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};

const useReadSensorsData = () => {
  const [data, setData] = useState<MapChartDataType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readData = await dsv(
          ";",
          "/sampleData/sensors.csv",
          (sensorData: DSVRowString<SensorsFileHeaders>) => {
            return {
              sensorId: sensorData.sensorId,
              latitude: Number(sensorData.latitude),
              longitude: Number(sensorData.longitude),
              observationsNum: Number(sensorData.observationsNum),
            };
          }
        );
        if (!readData) throw "empty data";
        setLoading(false);
        setData(Array.from(readData));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return console.log("Error loading the data\n", error);
      }
    };
    fetchData();
  }, []);
  return { data, loading };
};

const useReadTimeLineData = () => {
  const [data, setData] = useState<TemporalDataType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readData: TemporalDataType[] | undefined = await json(
          "/sampleData/sampleTimelineData.json"
        );
        if (!readData) throw "empty data";
        setData(readData);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return console.log("Error loading the data\n", error);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
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
  const [data, setData] = useState<
    Record<CleanDataFileHeaders, string | string[]>[] | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readData = await dsv(
          ";",
          "/sampleData/clean.csv",
          (dataEntry: DSVRowString<CleanDataFileHeaders>) => {
            const cleanEntry: Record<CleanDataFileHeaders, string | string[]> =
              dataEntry;
            for (const property of arrayProperties) {
              cleanEntry[property] = dataEntry[property].split(",") as string[];
            }
            return cleanEntry;
          }
        );
        if (!readData) throw "empty data";
        setLoading(false);
        setData(Array.from(readData));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return console.log("Error loading the data\n", error);
      }
    };
    fetchData();
  }, []);
  return { data, loading };
};

export const useReadData = () => {
  const dendrogramData = useReadDendrogramData();
  const lineChartData = useReadLineChartData();
  const mapData = useReadMapData();
  const sensorsData = useReadSensorsData();
  const timeLineData = useReadTimeLineData();
  const complexData = useReadComplexData();
  // TODO: FILTER THE DATA HERE ??

  const taxonomicClassification = !complexData.data
    ? undefined
    : group(
        complexData.data,
        (specimen) => specimen.scientificName,
        (specimen) => specimen.species,
        (specimen) => specimen.phylum,
        (specimen) => specimen.class,
        (specimen) => specimen.order,
        (specimen) => specimen.family,
        (specimen) => specimen.genus
      );

  return {
    dendrogramData,
    lineChartData,
    mapData,
    timeLineData,
    sensorsData,
    complexData,
    taxonomicClassification: {
      data: taxonomicClassification,
      loading: complexData.loading,
    },
  };
};
