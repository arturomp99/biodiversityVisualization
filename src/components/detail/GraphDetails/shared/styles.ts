import { Divider } from "@nextui-org/react";
import { themeFont, themeSizes } from "src/data/theme";
import styled from "styled-components";

export const StyledTitle = styled.p`
  font-weight: ${themeFont.h1.weight};
  font-size: ${themeFont.h1.size};
`;

export const StyledDivider = styled(Divider)`
  margin-top: ${themeSizes.elementsMargins.xl};
`;
