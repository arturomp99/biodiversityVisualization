import React, { useCallback } from "react";
import { useDetailInteractionContext } from "src/contexts/detailInteractionContext";
import { Distribution } from "./Distribution/Distribution";
import styled from "styled-components";

const DistributionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const TimeLineDetails = ({ isHistogram }: { isHistogram: boolean }) => {
  const { setTimelineHover } = useDetailInteractionContext();

  const onTimelineDetailsInteraction = useCallback(
    (hoveredSpecies: string[]) => {
      setTimelineHover && setTimelineHover(hoveredSpecies);
    },
    [setTimelineHover]
  );

  return (
    <DistributionsContainer>
      <Distribution
        isHistogram={isHistogram}
        onHover={onTimelineDetailsInteraction}
      />
      <Distribution
        isHistogram={isHistogram}
        onHover={onTimelineDetailsInteraction}
        isObservations
      />
    </DistributionsContainer>
  );
};
