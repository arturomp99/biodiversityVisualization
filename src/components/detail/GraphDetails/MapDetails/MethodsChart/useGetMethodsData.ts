import { useEffect, useMemo, useState } from "react";
import { useDataContext } from "src/contexts/dataContext";

export type MethodsDataType = {
  method: string;
  scientificName: string[];
  observations: number;
};

export const useGetMethodsData = (isObservations?: boolean) => {
  const { complexData } = useDataContext();
  const [methodsData, setMethodsData] = useState<MethodsDataType[]>();

  useEffect(() => {
    setMethodsData((previousData) => {
      if (complexData.loading) {
        return previousData;
      }
      if (!complexData.data) {
        return undefined;
      }
      const flattenedData = complexData.data.flatMap((dataPoint) =>
        dataPoint.identifiedBy.map((dataPointIdentification) => ({
          method: dataPointIdentification,
          scientificName: dataPoint.scientificName,
          observations: dataPoint.observationsNum,
        }))
      );
      const reducedData = flattenedData.reduce<MethodsDataType[]>(
        (acc: MethodsDataType[], curr) => {
          const foundIndex = acc.findIndex(
            (accEntry) => accEntry.method === curr.method
          );
          if (foundIndex > -1) {
            if (
              !acc[foundIndex].scientificName.find(
                (foundIndexScientificName) =>
                  foundIndexScientificName === curr.scientificName
              )
            ) {
              acc[foundIndex].scientificName.push(curr.scientificName);
            }
            acc[foundIndex].observations += curr.observations;
          } else {
            acc.push({ ...curr, scientificName: [curr.scientificName] });
          }
          return acc;
        },
        []
      );
      return reducedData;
    });
  }, [complexData.data, complexData.loading]);

  const totalCount = useMemo(
    () =>
      methodsData?.reduce<number>((acc: number, curr) => {
        acc += isObservations ? curr.observations : curr.scientificName.length;
        return acc;
      }, 0),
    [methodsData, isObservations]
  );
  return { methodsData, totalCount };
};
