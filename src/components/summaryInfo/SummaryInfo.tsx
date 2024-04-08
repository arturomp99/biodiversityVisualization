import React, { FC } from "react";
import { StyledSummaryInfo } from "./styles";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useDataContext } from "src/contexts/dataContext";

type SummaryInfoProps = {
  shouldAddFilteredInfo: boolean;
};

export const SummaryInfo: FC<SummaryInfoProps> = ({
  shouldAddFilteredInfo,
}) => {
  const { complexData } = useDataContext();

  const totalObservations = complexData.readData?.reduce<number>(
    (acc, curr) => {
      acc += curr.observationsNum;
      return acc;
    },
    0
  );
  const totalSpecies = complexData.readData?.length;
  const filteredObservations = complexData.data?.reduce<number>((acc, curr) => {
    acc += curr.observationsNum;
    return acc;
  }, 0);
  const filteredSpecies = complexData.data?.length;
  return (
    <StyledSummaryInfo>
      <Table
        hideHeader
        isStriped
        aria-label="Summary of detections"
        disabledKeys={!shouldAddFilteredInfo && ["3", "4"]}
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Count</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Total observations</TableCell>
            <TableCell>{totalObservations ?? <Spinner />}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Total species</TableCell>
            <TableCell>{totalSpecies ?? <Spinner />}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Filtered observations</TableCell>
            <TableCell>
              {shouldAddFilteredInfo
                ? filteredObservations ?? <Spinner />
                : "-"}
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Filtered species</TableCell>
            <TableCell>
              {shouldAddFilteredInfo ? filteredSpecies ?? <Spinner /> : "-"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </StyledSummaryInfo>
  );
};
