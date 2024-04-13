import React, { FC, useCallback } from "react";
import {
  Pagination,
  Card,
  CardBody,
  Spinner,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";

import { CatalogContainer } from "./CatalogContainer";
import { useGetCatalogData } from "./hooks/useGetCatalogData";
import { CatalogCardTitle, CatalogDescription } from "./styles";
import { isStringHTML } from "src/utils/isStringHTML";
import { DataType } from "src/data/data.types";

export const Catalog: FC<{
  catalogScientificNames?: DataType["scientificName"][];
}> = ({ catalogScientificNames }) => {
  const { loading, pageData, page, setPage, totalPages } = useGetCatalogData(
    catalogScientificNames
  );

  const onPaginationChange = useCallback(
    (pageNum: number) => {
      setPage(pageNum);
    },
    [setPage]
  );

  return (
    <CatalogContainer>
      {loading || !pageData ? (
        <Spinner label="gathering animals data..." />
      ) : (
        pageData.map(
          (catalogEntry, index) =>
            catalogEntry && (
              <Card key={index}>
                <CardHeader className="flex gap-3">
                  <CatalogCardTitle>
                    {catalogEntry.vernacularName}
                  </CatalogCardTitle>
                  <p>- {catalogEntry.species}</p>
                </CardHeader>
                <Divider />
                <CardBody className="flex gap-3">
                  {catalogEntry?.wikipediaResult && (
                    <Image
                      src={catalogEntry.wikipediaResult.thumbnail.source}
                    />
                  )}
                  <p>{catalogEntry.wikipediaResult?.description}</p>
                  <a href={catalogEntry.wikipediaResult?.fullurl}>Wikipedia</a>
                  {catalogEntry.descriptions &&
                    (isStringHTML(
                      catalogEntry.descriptions[0]?.description || ""
                    ) ? (
                      <CatalogDescription
                        dangerouslySetInnerHTML={{
                          __html: catalogEntry.descriptions[0]?.description,
                        }}
                      ></CatalogDescription>
                    ) : (
                      catalogEntry.descriptions[0]?.description || ""
                    ))}
                </CardBody>
              </Card>
            )
        )
      )}
      {totalPages && (
        <Pagination
          total={totalPages}
          initialPage={page}
          variant="light"
          onChange={onPaginationChange}
          color="success"
        />
      )}
    </CatalogContainer>
  );
};
