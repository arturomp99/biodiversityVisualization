import { useEffect, useRef, useState } from "react";
import { json } from "d3";

export const useFetchJSON = <DataType>(fileName: string) => {
  const [data, setData] = useState<DataType | undefined>();
  const [loading, setLoading] = useState(true);
  const dataRef = useRef<DataType | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dataRef.current = await json(fileName);
        if (!dataRef.current) throw "empty data";
        setData(dataRef.current);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return console.log("Error loading the data\n", error);
      }
    };
    fetchData();
  }, []);

  return { dataRef, data, setData, loading };
};
