import { useState } from "react";
import config from "src/config.json";
import { useFetch } from "src/components/shared/hooks/useReadData/useFetch";
import { CatalogDataType, TotalCatalogInfoType } from "../types";

export const useGetCatalogData = () => {
  const { data: totalData, loading: totalDataLoading } =
    useFetch<TotalCatalogInfoType>(
      config.BACKEND_URL + config.CATALOG_TOTAL_KEY
    );

  const [page, setPage] = useState(1);
  const { data: pageData, loading: pageDataLoading } = useFetch<
    CatalogDataType[]
  >(config.BACKEND_URL + config.CATALOG_KEY + `/${page}`);

  return {
    loading: totalDataLoading || pageDataLoading,
    pageData,
    page,
    setPage,
    totalPages: totalData?.totalPages,
  };
};
