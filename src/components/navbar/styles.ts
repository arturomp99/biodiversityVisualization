import styled from "styled-components";
import { Link } from "react-router-dom";
import { appPaddings, navBar } from "src/data/constants";

export const StyledNavBarContainer = styled.div`
  height: ${navBar.height};
  padding: 0px ${appPaddings.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${navBar.backgroundColor};
  color: ${navBar.fontColor};
  position: sticky;
  top: 0;
`;

export const StyledLogo = styled(Link)`
  font-size: 1.5rem;
  margin: 1rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
`;

export const StyledNavigationList = styled.ul`
  display: flex;
`;

export const StyledNavigationListItem = styled.li`
  list-style: none;
`;

export const StyledNavBarLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: white;
  padding: 0.5rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;

  &:not(.active):hover {
    background-color: ${navBar.hoveredColor};
  }
`;
