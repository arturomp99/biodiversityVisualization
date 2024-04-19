import { useDataContext } from "src/contexts/dataContext";

export const useGetSummayInfo = () => {
  const { complexData } = useDataContext();

  const totalObservations = complexData.readData?.reduce<number>(
    (acc, curr) => {
      acc += curr.observationsNum;
      return acc;
    },
    0
  );
  const totalSpecies = complexData.readData?.length;
  const filteredObservations = complexData.data?.reduce<number>((acc, curr) => {
    acc += curr.observationsNum;
    return acc;
  }, 0);
  const filteredSpecies = complexData.data?.length;
  return {
    loading: complexData.loading,
    totalObservations,
    totalSpecies,
    filteredObservations,
    filteredSpecies,
  };
};
