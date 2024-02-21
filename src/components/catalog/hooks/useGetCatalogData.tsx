import { useEffect, useRef, useState } from "react";
import { useDataContext } from "src/contexts/dataContext";
import { catalogParameters } from "src/data/constants";
import {
  getDescription,
  getUsageKey,
  getVernacularNames,
} from "../requests/requests";
import { DataType } from "src/data/data.types";

const getGBIFData = (pageReadData: DataType[]) => {
  return pageReadData.map(async (dataEntry) => {
    const species = dataEntry.species as string;
    const { usageKey } = (await getUsageKey(species)) || "";
    if (!usageKey) return undefined;
    const { results: vernacularNames } = await getVernacularNames(usageKey);
    const { results: descriptions } = await getDescription(usageKey);

    return { species, usageKey, vernacularNames, descriptions };
  });
};

export const useGetCatalogData = () => {
  const { complexData } = useDataContext();
  const totalPages = useRef<number | undefined>();
  const [page, setPage] = useState(1);
  const [catalogData, setCatalogData] =
    useState<Awaited<ReturnType<typeof getGBIFData>[number]>[]>();

  useEffect(() => {
    if (!complexData.data || complexData.loading) {
      return;
    }
    const initIndex = (page - 1) * catalogParameters.animalsPerPage;
    const endIndex = page * catalogParameters.animalsPerPage;
    const pageComplexData = complexData.data.slice(initIndex, endIndex);
    const gbifData = getGBIFData(pageComplexData);
    Promise.all(gbifData)
      .then((data) => setCatalogData(data))
      .catch((error) => console.log(error));
  }, [page, complexData]);

  useEffect(() => {
    totalPages.current = complexData.data?.length
      ? Math.floor(complexData.data.length / catalogParameters.animalsPerPage) +
        1
      : undefined;
  }, [complexData.data]);

  return {
    loading: complexData.loading,
    catalogData,
    page,
    setPage,
    totalPages: totalPages.current,
  };
};
