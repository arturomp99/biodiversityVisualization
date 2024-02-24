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
          <StyledNavBarLink to="/data/Dashboard">Dashboard</StyledNavBarLink>
        </StyledNavigationListItem>
        <StyledNavigationListItem>
          <StyledNavBarLink to="/data/Catalog">Catalog</StyledNavBarLink>
        </StyledNavigationListItem>
      </StyledNavigationList>
    </StyledNavBarContainer>
  );
};
