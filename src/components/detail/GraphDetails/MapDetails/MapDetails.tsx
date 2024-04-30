import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { Catalog } from "src/components/catalog/Catalog";
import { StyledDivider, StyledTitle } from "./styles";
import { DataType } from "src/data/data.types";
import { ConfidenceDistribution } from "./ConfidenceDistribution/ConfidenceDistribution";
import { MethodsTable } from "./MethodsChart/MethodsTable";
import { GraphDetailsProps } from "../GraphDetails";

const DetailBarChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const MapDetails: FC<{
  catalogScientificNames?: DataType["scientificName"][];
  showCatalogHandler?: GraphDetailsProps["showCatalogHandler"];
}> = ({ catalogScientificNames, showCatalogHandler }) => {
  const catalogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [catalogScientificNames]);
  return (
    <>
      <DetailBarChartsContainer>
        <ConfidenceDistribution onBarClick={showCatalogHandler} />
        <MethodsTable showCatalogHandler={showCatalogHandler} />
      </DetailBarChartsContainer>
      {catalogScientificNames && (
        <div ref={catalogRef}>
          <StyledDivider />
          <StyledTitle>Catalog of observations</StyledTitle>
          <Catalog catalogScientificNames={catalogScientificNames} />
        </div>
      )}
    </>
  );
};
