import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { StyledGraphCard } from "src/components/shared/containers/Card";
import { StyledGraphTitle } from "src/components/shared/containers/Card/styles";
import { StyledDetailChart } from "../../styles";
import { MethodsChartSettings } from "./MethodsChartSettings";
import { useGetMethodsData } from "./useGetMethodsData";
import { MethodsIndicator } from "./MethodsIndicator";

export const MethodsTable = () => {
  const [isObservations, setIsObservations] = useState<boolean>();

  const { methodsData: data, totalCount } = useGetMethodsData(isObservations);

  return (
    <StyledGraphCard $noHover>
      <div className="flex space-x-3 flex-wrap items-center justify-between pr-12">
        <StyledGraphTitle>Detections methods</StyledGraphTitle>
        <MethodsChartSettings isObservationsCallback={setIsObservations} />
      </div>

      <StyledDetailChart>
        {data && data.length > 0 && (
          <Table aria-label="Table of the data for different identification methods">
            <TableHeader>
              <TableColumn width="1fr">Method</TableColumn>
              <TableColumn allowsResizing width="1fr">
                {isObservations ? "Observations" : "Species"}
              </TableColumn>
              <TableColumn width="50%">Indicator</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((dataRow, index) => (
                <TableRow key={index}>
                  <TableCell>{dataRow.method}</TableCell>
                  {isObservations ? (
                    <TableCell>{dataRow.observations}</TableCell>
                  ) : (
                    <TableCell>
                      {isObservations
                        ? dataRow.observations
                        : dataRow.species.length}
                    </TableCell>
                  )}
                  <TableCell>
                    {
                      <MethodsIndicator
                        count={
                          isObservations
                            ? dataRow.observations
                            : dataRow.species.length
                        }
                        total={totalCount ?? 0}
                      />
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </StyledDetailChart>
    </StyledGraphCard>
  );
};
