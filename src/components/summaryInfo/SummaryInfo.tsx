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
import { useGetSummayInfo } from "./useGetSummaryInfo";

type SummaryInfoProps = {
  shouldAddFilteredInfo: boolean;
};

export const SummaryInfo: FC<SummaryInfoProps> = ({
  shouldAddFilteredInfo,
}) => {
  const {
    totalObservations,
    totalSpecies,
    filteredObservations,
    filteredSpecies,
  } = useGetSummayInfo();
  return (
    <StyledSummaryInfo>
      <Table
        hideHeader
        aria-label="Summary of detections"
        disabledKeys={!shouldAddFilteredInfo ? ["3", "4"] : undefined}
        classNames={{
          wrapper: "rounded-none bg-green-800 text-white",
        }}
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
          <TableRow key="2" className="bg-green-900">
            <TableCell className="first:before:rounded-l-lg last:before:rounded-r-lg">
              Total species
            </TableCell>
            <TableCell className="first:before:rounded-l-lg last:before:rounded-r-lg">
              {totalSpecies ?? <Spinner />}
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Filtered observations</TableCell>
            <TableCell>
              {shouldAddFilteredInfo
                ? filteredObservations ?? <Spinner />
                : "-"}
            </TableCell>
          </TableRow>
          <TableRow key="4" className="bg-green-900">
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
