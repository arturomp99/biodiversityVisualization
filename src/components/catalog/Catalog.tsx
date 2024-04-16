import React, { FC, useCallback } from "react";
import {
  Pagination,
  Card,
  CardBody,
  Spinner,
  Image,
  CardFooter,
  CardHeader,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

import { CatalogContainer } from "./CatalogContainer";
import { useGetCatalogData } from "./hooks/useGetCatalogData";
import { CatalogCardTitle } from "./styles";
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
                <CardBody className="flex flex-row gap-3 items-stretch">
                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="w-1/2 max-w-96 borer-none relative self-center h-fit"
                  >
                    {catalogEntry?.wikipediaResult && (
                      <Image
                        alt={`image of a ${catalogEntry.scientificName}`}
                        className="object-cover  aspect-square"
                        src={catalogEntry.wikipediaResult.thumbnail.source}
                      />
                    )}
                    <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 flex items-center justify-center">
                      <CatalogCardTitle>
                        {catalogEntry.vernacularName}
                      </CatalogCardTitle>
                    </CardFooter>
                  </Card>
                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="flex-grow borer-none relative shadow-none"
                  >
                    <CardHeader className="flex items-center justify-center font-semibold text-gray-800 mb-1">
                      {catalogEntry.scientificName}
                    </CardHeader>
                    <CardBody>
                      <Accordion selectionMode="multiple" variant="splitted">
                        <AccordionItem
                          key="1"
                          aria-label={`${catalogEntry.scientificName} taxonomy`}
                          title="Taxonomy"
                        >
                          {catalogEntry.phylum && (
                            <p>
                              <strong>Phylum</strong>: {catalogEntry.phylum}
                            </p>
                          )}
                          {catalogEntry.class && (
                            <p className="pl-4">
                              <strong>Class</strong>: {catalogEntry.class}
                            </p>
                          )}
                          {catalogEntry.order && (
                            <p className="pl-8">
                              <strong>Order</strong>: {catalogEntry.order}
                            </p>
                          )}
                          {catalogEntry.family && (
                            <p className="pl-12">
                              <strong>Family</strong>: {catalogEntry.family}
                            </p>
                          )}
                          {catalogEntry.genus && (
                            <p className="pl-16">
                              <strong>Genus</strong>: {catalogEntry.genus}
                            </p>
                          )}
                          {catalogEntry.species && (
                            <p className="pl-20">
                              <strong>Species</strong>: {catalogEntry.species}
                            </p>
                          )}
                        </AccordionItem>
                        {catalogEntry.wikipediaResult?.description ||
                        (catalogEntry.descriptions &&
                          catalogEntry.descriptions.length) ? (
                          <AccordionItem
                            key="2"
                            aria-label={`${catalogEntry.scientificName} description`}
                            title="Description"
                          >
                            {catalogEntry.wikipediaResult?.description && (
                              <p>{catalogEntry.wikipediaResult?.description}</p>
                            )}
                            {catalogEntry.descriptions &&
                              catalogEntry.descriptions.length && (
                                <p>
                                  {catalogEntry.descriptions[0].description}
                                </p>
                              )}
                          </AccordionItem>
                        ) : (
                          <></>
                        )}
                      </Accordion>
                    </CardBody>
                  </Card>
                  {/* <p>{catalogEntry.wikipediaResult?.description}</p>
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
                    ))} */}
                </CardBody>
              </Card>
            )
        )
      )}
      {totalPages && totalPages > 1 && (
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
