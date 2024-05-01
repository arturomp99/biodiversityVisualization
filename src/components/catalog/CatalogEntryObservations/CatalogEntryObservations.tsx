import React from "react";
import styled from "styled-components";
import { CatalogDataType } from "../types";
import { renderGraph } from "src/components/graphs/shared/utils/renderGraph";
import { Histogram } from "src/components/graphs/Histogram/Histogram";
import { HistogramDataType, Map } from "src/components/graphs";
import { useObserveResize } from "src/components/shared/hooks/useObserveResize";
import { DataType } from "src/data/data.types";
import { useDataContext } from "src/contexts/dataContext";
import { themeSizes } from "src/data/theme";

const StyledLayout = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  gap: ${themeSizes.elementsMargins.md};
`;

const HistogramContainer = styled.div`
  width: 100%;
  height: 50%;
`;
const MapContainer = styled.div`
  width: 100%;
  height: 50%;
`;
export const CatlogEntryObservations = ({
  data,
}: {
  data: CatalogDataType;
}) => {
  const {
    containerRef: histogramContainerRef,
    dimensions: histogramDimensions,
  } = useObserveResize();
  const { containerRef: mapContainerRef, dimensions: mapDimensions } =
    useObserveResize();
  const timeExtent = useDataContext().filtersData.temporal;

  return (
    <StyledLayout>
      <HistogramContainer ref={histogramContainerRef}>
        {renderGraph(
          <Histogram
            dimensions={histogramDimensions ?? [0, 0]}
            data={[data as DataType]}
            xExtent={
              timeExtent && timeExtent[0] && timeExtent[1]
                ? (timeExtent as [Date, Date])
                : undefined
            }
            reducerFunction={(dataPoint: HistogramDataType<DataType>[]) =>
              dataPoint.reduce<number>((acc: number, curr) => {
                acc += curr.observationsNum;
                return acc;
              }, 0)
            }
          />,
          histogramDimensions
        )}
      </HistogramContainer>
      <MapContainer ref={mapContainerRef}>
        {renderGraph(
          <Map
            markers={[
              ...data.position.map((position) => ({
                latitude: +position.latitude,
                longitude: +position.longitude,
                observationsNum: +data.observationsNum,
              })),
            ]}
            dimensions={mapDimensions ?? [0, 0]}
            noDrones
          />,
          mapDimensions
        )}
      </MapContainer>
    </StyledLayout>
  );
};
