import React, { useCallback } from "react";
import { Pagination, Card, CardBody } from "@nextui-org/react";

import { CatalogContainer } from "./CatalogContainer";
import { useGetCatalogData } from "./hooks/useGetCatalogData";

export const Catalog = () => {
  const { loading, catalogData, page, setPage, totalPages } =
    useGetCatalogData();

  const onPaginationChange = useCallback(
    (pageNum: number) => {
      setPage(pageNum);
    },
    [setPage]
  );

  return (
    <CatalogContainer>
      {loading || !catalogData ? (
        <p>Loading...</p>
      ) : (
        catalogData.map((catalogEntry, index) => (
          <Card key={index}>
            <CardBody>
              <p>{catalogEntry.species}</p>
            </CardBody>
          </Card>
        ))
      )}
      {catalogData?.length && (
        <Pagination
          total={totalPages}
          initialPage={page}
          variant="light"
          onChange={onPaginationChange}
        />
      )}
    </CatalogContainer>
  );
};
