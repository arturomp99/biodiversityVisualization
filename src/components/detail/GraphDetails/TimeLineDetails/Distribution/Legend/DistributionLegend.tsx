import React, { FC } from "react";
import { HistogramProps } from "src/components/graphs";
import { DataType } from "src/data/data.types";
import styled from "styled-components";

const StyledListItem = styled.li<{ $color?: string }>`
  color: ${({ $color }) => $color ?? "black"};
`;

export const DistributionLegend: FC<{
  keys: string[];
  colorScale?: HistogramProps<DataType>["colorScale"];
}> = ({ keys, colorScale }) => {
  return (
    <ul className="flex space-x-[2rem] flex-wrap mt-[-2rem] mx-auto list-disc justify-center text-sm">
      {keys.map((key) => (
        <StyledListItem
          $color={colorScale ? colorScale(key) : undefined}
          key={key}
        >
          {key}
        </StyledListItem>
      ))}
    </ul>
  );
};
