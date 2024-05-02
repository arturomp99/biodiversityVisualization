import React, { ReactNode, createContext, useContext } from "react";
import { useReadData } from "src/components/shared/hooks/useReadData/useReadData";

const defaultData = { data: undefined, loading: true };
const dataContext = createContext<ReturnType<typeof useReadData>>({
  detectionsPositionsData: defaultData,
  complexData: { ...defaultData, readData: undefined },
  taxonomicClassification: defaultData,
  filtersData: {
    taxonomic: undefined,
    temporal: undefined,
    drop: undefined,
    confidence: undefined,
    identificationMethod: undefined,
    location: undefined,
  },
  geoJsonData: defaultData,
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
