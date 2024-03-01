import { useEffect, useRef, useState } from "react";
import { dsv } from "d3";

export const useFetchDSV = <DataType extends object, Columns extends string>(
  separator: string,
  fileName: string,
  row: Parameters<typeof dsv<DataType, Columns>>[3]
) => {
  const [data, setData] = useState<DataType[] | undefined>();
  const [loading, setLoading] = useState(true);
  const dataRef = useRef<DataType[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readData = await dsv<DataType, Columns>(separator, fileName, row);
        if (!readData) throw "empty data";
        setLoading(false);
        dataRef.current = Array.from(readData);
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
