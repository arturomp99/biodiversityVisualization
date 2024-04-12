import { useEffect, useState } from "react";
import config from "src/config.json";
import { useFetch } from "src/components/shared/hooks/useReadData/useFetch";
import { CatalogDataType, TotalCatalogInfoType } from "../types";
import { catalogParameters } from "src/data/constants";

export const useGetCatalogData = () => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState<CatalogDataType[]>();
  const { data: totalData, loading: totalDataLoading } =
    useFetch<TotalCatalogInfoType>(
      config.BACKEND_URL + config.CATALOG_TOTAL_KEY
    );

  const { data, loading: pageDataLoading } = useFetch<CatalogDataType[]>(
    config.BACKEND_URL + config.CATALOG_KEY
  );

  useEffect(() => {
    setPageData(() =>
      data?.slice(
        (page - 1) * catalogParameters.animalsPerPage,
        page * catalogParameters.animalsPerPage
      )
    );
  }, [page, data]);

  return {
    loading: totalDataLoading || pageDataLoading,
    pageData,
    page,
    setPage,
    totalPages: totalData?.totalPages,
  };
};
