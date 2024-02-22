import React, { useCallback } from "react";
import { Pagination, Card, CardBody, Spinner } from "@nextui-org/react";

import { CatalogContainer } from "./CatalogContainer";
import { useGetCatalogData } from "./hooks/useGetCatalogData";
import { getEnglishVernacularName } from "./utils/getEnglishVernacularName";

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
        <Spinner label="gathering animals data..." />
      ) : (
        catalogData.map(
          (catalogEntry, index) =>
            catalogEntry && (
              <Card key={index}>
                <CardBody>
                  <p>
                    {getEnglishVernacularName(catalogEntry.vernacularNames)}
                  </p>
                  <p>{catalogEntry.species}</p>
                  <p>{catalogEntry.usageKey}</p>
                  <p>
                    {catalogEntry.descriptions[0]?.description ||
                      "no description"}
                  </p>
                </CardBody>
              </Card>
            )
        )
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
