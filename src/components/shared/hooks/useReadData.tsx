import { useEffect, useState } from "react";
import { DSVRowString, ExtendedFeatureCollection, csv, json } from "d3";
import { TreeDataType } from "src/components/graphs/Dendrogram/dendrogram.types";
import { SoundChartDataType } from "src/components/graphs/LineChart/lineChart.types";
import { SoundHeaders } from "src/data/sampleData/sampleData.types";
import { TemporalDataType } from "src/components/graphs/TimeLine/timeLine.types";

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
          "/sampleData/sampleSoundData.csv",
          (soundData: DSVRowString<SoundHeaders>) => {
            return {
              timeStamp: Number(soundData.timeStamp),
              soundMax: Number(soundData.soundMax),
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

export const useReadData = () => {
  const dendrogramData = useReadDendrogramData();
  const lineChartData = useReadLineChartData();
  const mapData = useReadMapData();
  const timeLineData = useReadTimeLineData();

  return { dendrogramData, lineChartData, mapData, timeLineData };
};
