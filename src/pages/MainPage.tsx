import React from "react";
import { appPaddings, paragraphMargin } from "src/data/constants";
import styled from "styled-components";

const StyledSection = styled.section<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 0 ${appPaddings.lg};
  overflow: hidden;
`;

const StyledTitle = styled.p`
  margin: ${paragraphMargin} 0;
  font-size: 50px;
  color: #2d544a;
  font-weight: bold;
`;

export const MainPage = () => {
  return (
    <>
      <StyledSection color={"#e5f3d6"}>
        <StyledTitle>MAIN PAGE</StyledTitle>
      </StyledSection>
      <StyledSection color={"#faf5f2"}>Content</StyledSection>
      <StyledSection color={"#2d544a"}>Content</StyledSection>
    </>
  );
};
