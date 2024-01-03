import React from "react";
import {
  StyledLogo,
  StyledNavBarContainer,
  StyledNavBarLink,
  StyledNavigationList,
  StyledNavigationListItem,
} from "./styles";

export const NavBar = () => {
  return (
    <StyledNavBarContainer>
      <StyledLogo to="/">TFM</StyledLogo>
      <StyledNavigationList>
        <StyledNavigationListItem>
          <StyledNavBarLink to="/Dashboard">Dashboard</StyledNavBarLink>
        </StyledNavigationListItem>
        <StyledNavigationListItem>
          <StyledNavBarLink to="/Detail">Detail</StyledNavBarLink>
        </StyledNavigationListItem>
      </StyledNavigationList>
    </StyledNavBarContainer>
  );
};
