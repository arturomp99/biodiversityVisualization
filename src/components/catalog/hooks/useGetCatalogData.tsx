import { useEffect, useRef, useState } from "react";
import { useDataContext } from "src/contexts/dataContext";
import { catalogParameters } from "src/data/constants";
import { DataType } from "src/data/data.types";

export const useGetCatalogData = () => {
  const {
    complexData: { data, loading },
  } = useDataContext();
  const totalPages = useRef<number | undefined>();
  const [page, setPage] = useState(1);
  const [catalogData, setCatalogData] = useState<DataType[]>();

  useEffect(() => {
    if (!data || loading) {
      return;
    }
    const initIndex = (page - 1) * catalogParameters.animalsPerPage;
    const endIndex = page * catalogParameters.animalsPerPage;
    setCatalogData(data && data.slice(initIndex, endIndex));
  }, [page, data, loading]);

  useEffect(() => {
    totalPages.current = data?.length
      ? Math.floor(data.length / catalogParameters.animalsPerPage) + 1
      : undefined;
  }, [data]);

  return {
    loading,
    catalogData,
    page,
    setPage,
    totalPages: totalPages.current,
  };
};
