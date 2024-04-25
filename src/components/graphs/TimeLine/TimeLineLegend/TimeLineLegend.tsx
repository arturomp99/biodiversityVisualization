import React, { FC, useState } from "react";
import { LegendProps } from "../../shared/Legend/Legend.types";
import styled, { css } from "styled-components";
import type { ScaleOrdinal } from "d3";
import { BackArrow, NextArrow } from "src/icons";
import { ceil } from "lodash";

const LegendEntry = styled.li<{ $color?: string }>`
  font-size: 0.9rem;
  ${({ $color }) => css`
    color: ${$color ?? "black"};
  `}
`;

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const TimeLineLegend: FC<
  LegendProps & {
    colorScale: ScaleOrdinal<string, string, never>;
    onEntryHover: (key: string | undefined) => void;
  }
> = (props) => {
  const { keys, colorScale, onEntryHover } = props;

  const keysPerPage = 8;
  const [page, setPage] = useState<number>(1);
  const maxPage = ceil(keys.length / keysPerPage);
  const keysPaginated = keys.slice(
    (page - 1) * keysPerPage,
    page * keysPerPage
  );

  return (
    <>
      <ul className="list-disc">
        {keysPaginated.map((key, index) => (
          <LegendEntry
            key={index}
            $color={colorScale(key)}
            onMouseOver={() => onEntryHover(key)}
            onMouseOut={() => onEntryHover(undefined)}
          >
            {key}
          </LegendEntry>
        ))}
      </ul>
      {keys.length > keysPerPage && (
        <PaginationContainer>
          <button
            disabled={page === 1}
            className={`h-3 ${page === 1 && "opacity-30"}`}
            onClick={() =>
              setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))
            }
          >
            <BackArrow />
          </button>
          <p>
            {page} / {maxPage}
          </p>
          <button
            disabled={page === maxPage}
            className={`h-3 ${page === maxPage && "opacity-30"}`}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            <NextArrow />
          </button>
        </PaginationContainer>
      )}
    </>
  );
};
