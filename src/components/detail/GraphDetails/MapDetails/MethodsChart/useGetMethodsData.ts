import { useEffect, useMemo, useState } from "react";
import { useDataContext } from "src/contexts/dataContext";

export type MethodsDataType = {
  method: string;
  species: string[];
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
          species: dataPoint.species,
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
              !acc[foundIndex].species.find(
                (foundIndexSpecies) => foundIndexSpecies === curr.species
              )
            ) {
              acc[foundIndex].species.push(curr.species);
            }
            acc[foundIndex].observations += curr.observations;
          } else {
            acc.push({ ...curr, species: [curr.species] });
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
        acc += isObservations ? curr.observations : curr.species.length;
        return acc;
      }, 0),
    [methodsData, isObservations]
  );
  return { methodsData, totalCount };
};
