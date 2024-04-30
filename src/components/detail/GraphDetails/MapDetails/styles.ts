import { Divider } from "@nextui-org/react";
import { themeFont, themeSizes } from "src/data/theme";
import styled from "styled-components";

export const StyledTitle = styled.p`
  font-weight: ${themeFont.p.weight};
  font-size: ${themeFont.h3.size};
`;

export const StyledDivider = styled(Divider)`
  margin-top: ${themeSizes.elementsMargins.xl};
`;
