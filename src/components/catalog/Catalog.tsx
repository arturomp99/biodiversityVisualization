import React from "react";
import { CatalogContainer } from "./CatalogContainer";
import { useGetCatalogData } from "./hooks/useGetCatalogData";

export const Catalog = () => {
  const { loading, catalogData, page } = useGetCatalogData();

  return (
    <CatalogContainer>
      {loading || !catalogData ? (
        <p>Loading...</p>
      ) : (
        catalogData.map((catalogEntry, index) => (
          <p key={index}>{catalogEntry.species}</p>
        ))
      )}
      <p>{`page ${page}`}</p>
    </CatalogContainer>
  );
};
