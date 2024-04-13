import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLogo = styled(Link)`
  font-size: 1.5rem;
  margin: 1rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

export const StyledNavBarLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black;
  padding: 0.5rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  transition-property: background-color;
  transition-timing-function: ease;
  transition-duration: 250ms;

  &:not(.active):hover {
    background-color: hsl(146 79% 80% / 2);
  }
`;
