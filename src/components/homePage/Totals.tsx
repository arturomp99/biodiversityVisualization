import React from "react";
import { themeColors, themeFont } from "src/data/theme";
import styled from "styled-components";
import { useGetSummayInfo } from "../summaryInfo/useGetSummaryInfo";

const StyledSection1 = styled.section`
  height: 25vh;
  padding: 0 5vw;
  background-color: ${themeColors.background.color1};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StyledTitle = styled.p`
  font-size: ${themeFont.h1.size};
  font-weight: lighter;
  color: black;
`;

export const Totals = () => {
  const { loading, totalObservations, totalSpecies } = useGetSummayInfo();

  return (
    <StyledSection1>
      {loading ? (
        <StyledTitle>...</StyledTitle>
      ) : (
        <>
          <StyledTitle>{totalObservations} observations</StyledTitle>
          <StyledTitle>{totalSpecies} identified species</StyledTitle>
        </>
      )}
    </StyledSection1>
  );
};
