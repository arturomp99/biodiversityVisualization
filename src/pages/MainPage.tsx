import React from "react";
import { paragraphMargin } from "src/data/constants";
import styled from "styled-components";
import { themeColors, themeSizes } from "src/data/theme";

const StyledSection = styled.section<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 0 ${themeSizes.appPaddings.xl};
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
      <StyledSection color={themeColors.background.color1}>
        <StyledTitle>MAIN PAGE</StyledTitle>
      </StyledSection>
      <StyledSection color={themeColors.background.color2}>
        Content
      </StyledSection>
      <StyledSection color={themeColors.background.color3}>
        Content
      </StyledSection>
    </>
  );
};
