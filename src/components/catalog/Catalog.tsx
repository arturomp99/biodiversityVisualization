import React, { useCallback } from "react";
import {
  Pagination,
  Card,
  CardBody,
  Spinner,
  CardHeader,
  Divider,
} from "@nextui-org/react";

import { CatalogContainer } from "./CatalogContainer";
import { useGetCatalogData } from "./hooks/useGetCatalogData";
import { getEnglishVernacularName } from "./utils/getEnglishVernacularName";
import { CatalogCardTitle, CatalogDescription } from "./styles";
import { isStringHTML } from "src/utils/isStringHTML";

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
                <CardHeader className="flex gap-3">
                  <CatalogCardTitle>{catalogEntry.species}</CatalogCardTitle>
                  <p>
                    {getEnglishVernacularName(catalogEntry.vernacularNames)}
                  </p>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>{catalogEntry.usageKey}</p>
                  {isStringHTML(
                    catalogEntry.descriptions[0]?.description || ""
                  ) ? (
                    <CatalogDescription
                      dangerouslySetInnerHTML={{
                        __html: catalogEntry.descriptions[0]?.description,
                      }}
                    ></CatalogDescription>
                  ) : (
                    catalogEntry.descriptions[0]?.description || ""
                  )}
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
