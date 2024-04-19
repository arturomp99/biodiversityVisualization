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
import { CatlogEntryObservations } from "./CatalogEntryObservations/CatalogEntryObservations";

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
              <Card key={index} className="rounded-none">
                <CardBody className="flex flex-row gap-3 items-stretch">
                  <Card
                    isFooterBlurred
                    radius="lg"
                    className="w-full max-w-96 borer-none relative self-center h-fit rounded-none"
                    style={{ minWidth: "min(50%, 24rem)" }}
                  >
                    {(catalogEntry?.molInfo ||
                      catalogEntry.wikipediaResult?.thumbnail) && (
                      <Image
                        alt={`image of a ${catalogEntry.scientificName}`}
                        removeWrapper
                        classNames={{
                          img: "rounded-none w-full",
                        }}
                        src={
                          catalogEntry.molInfo?.image.url ??
                          catalogEntry.wikipediaResult?.thumbnail.source
                        }
                      />
                    )}
                    <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 flex items-center justify-center">
                      <CatalogCardTitle>
                        {catalogEntry.molInfo?.commonname ??
                          catalogEntry.gbifVernacularName?.vernacularName}
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
                      {catalogEntry.xenoCantoResult ? (
                        <div className="w-3/4 mx-auto h-56">
                          <iframe
                            className="w-full h-full"
                            src={`https://xeno-canto.org/${catalogEntry.xenoCantoResult.id}/embed`}
                          ></iframe>
                        </div>
                      ) : (
                        <p className="mb-3">No sound available</p>
                      )}
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

                        <AccordionItem
                          key="2"
                          aria-label={`${catalogEntry.scientificName} description`}
                          title="Description"
                        >
                          {catalogEntry.molInfo?.info &&
                          catalogEntry.molInfo.info.length ? (
                            <p>{catalogEntry.molInfo.info[0].content}</p>
                          ) : (
                            <p>No information found</p>
                          )}
                        </AccordionItem>
                        <AccordionItem
                          key="3"
                          aria-label={`${catalogEntry.scientificName} observations`}
                          title="Observations"
                        >
                          <CatlogEntryObservations data={catalogEntry} />
                        </AccordionItem>
                      </Accordion>
                    </CardBody>
                  </Card>
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
