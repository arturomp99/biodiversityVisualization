import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  width: fit-content;
`;

export const ConditionalLink: FC<{
  condition: boolean;
  to?: string;
  children: ReactNode;
}> = ({ condition, to, children }) => {
  return condition && to ? (
    <StyledLink to={to}>{children}</StyledLink>
  ) : (
    children
  );
};
