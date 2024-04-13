import { useEffect, useState } from "react";
import config from "src/config.json";
import { useFetch } from "src/components/shared/hooks/useReadData/useFetch";
import { CatalogDataType, TotalCatalogInfoType } from "../types";
import { catalogParameters } from "src/data/constants";
import { useApplyFilters } from "src/components/shared/hooks/useApplyFilters/useApplyFilters";

export const useGetCatalogData = (catalogScientificNames?: string[]) => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState<CatalogDataType[]>();
  const {
    data: totalData,
    setData: setTotalData,
    loading: totalDataLoading,
  } = useFetch<TotalCatalogInfoType>(
    config.BACKEND_URL + config.CATALOG_TOTAL_KEY
  );

  const {
    data,
    dataRef,
    setData,
    loading: pageDataLoading,
  } = useFetch<CatalogDataType[]>(config.BACKEND_URL + config.CATALOG_KEY);

  useApplyFilters<NonNullable<typeof data>[0]>(
    dataRef.current,
    setData,
    () => {
      setPage(1);
    },
    catalogScientificNames
  );

  useEffect(() => {
    setPageData(() =>
      data?.slice(
        (page - 1) * catalogParameters.animalsPerPage,
        page * catalogParameters.animalsPerPage
      )
    );
  }, [page, data]);

  useEffect(() => {
    setTotalData(() => ({
      totalAnimals: data?.length,
      totalPages: Math.ceil(
        (data?.length ?? 1) / catalogParameters.animalsPerPage
      ),
    }));
  }, [data]);

  return {
    loading: totalDataLoading || pageDataLoading,
    pageData,
    page,
    setPage,
    totalPages: totalData?.totalPages,
  };
};
