import React, { ReactNode, createContext, useContext } from "react";
import { useReadData } from "src/components/shared/hooks/useReadData";

const defaultData = { data: undefined, loading: true };
const dataContext = createContext<ReturnType<typeof useReadData>>({
  dendrogramData: defaultData,
  lineChartData: defaultData,
  mapData: defaultData,
  timeLineData: defaultData,
});

export const DataContextProvider = (props: { children: ReactNode }) => {
  const data = useReadData();

  return (
    <dataContext.Provider value={data}>{props.children}</dataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(dataContext);
};
