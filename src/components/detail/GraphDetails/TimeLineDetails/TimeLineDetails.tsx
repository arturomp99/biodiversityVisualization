import React, { useCallback, useEffect, useRef } from "react";
import { useDetailInteractionContext } from "src/contexts/detailInteractionContext";
import styled from "styled-components";
import { Distribution } from "./Distribution/Distribution";
import { GraphDetailsProps } from "../GraphDetails";
import { DataType } from "src/data/data.types";
import { StyledDivider, StyledTitle } from "../MapDetails/styles";
import { Catalog } from "src/components/catalog/Catalog";

const DistributionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const TimeLineDetails = ({
  isHistogram,
  showCatalogHandler,
  catalogScientificNames,
}: {
  isHistogram: boolean;
  showCatalogHandler?: GraphDetailsProps["showCatalogHandler"];
  catalogScientificNames?: DataType["scientificName"][];
}) => {
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const { setTimelineHover } = useDetailInteractionContext();

  const onTimelineDetailsInteraction = useCallback(
    (hoveredSpecies: string[]) => {
      setTimelineHover && setTimelineHover(hoveredSpecies);
    },
    [setTimelineHover]
  );

  useEffect(() => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [catalogScientificNames]);

  return (
    <>
      <DistributionsContainer>
        <Distribution
          isHistogram={isHistogram}
          onHover={onTimelineDetailsInteraction}
          isFullInteractive
          onBarClick={showCatalogHandler}
        />
        <Distribution
          isHistogram={isHistogram}
          onHover={onTimelineDetailsInteraction}
          isObservations
          isFullInteractive
          onBarClick={showCatalogHandler}
        />
      </DistributionsContainer>
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
