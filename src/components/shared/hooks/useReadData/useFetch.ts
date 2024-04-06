import { useEffect, useRef, useState } from "react";

export const useFetch = <DataType extends object>(url: string) => {
  const [data, setData] = useState<DataType[] | undefined>();
  const [loading, setLoading] = useState(true);
  const dataRef = useRef<DataType[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readData = (await (await fetch(url)).json()).data as DataType[];
        if (!readData) throw "empty data";
        setLoading(false);
        dataRef.current = readData;
        setData(dataRef.current);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return console.log("Error loading the data\n", error);
      }
    };
    fetchData();
  }, []);

  return { dataRef, data, setData, loading };
};
