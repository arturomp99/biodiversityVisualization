import {
  extent,
  max,
  scaleTime,
  scaleLinear,
  bin,
  stack,
  union,
  stackOrderAscending,
} from "d3";
import type { ScaleTime, ScaleLinear, Bin, Series } from "d3";
import { HistogramDataType, HistogramProps } from "..";
import { DataType } from "src/data/data.types";
import { histogramParameters } from "src/data/constants";
import { getHistogramThresholdsArray } from "src/utils/getHistogramThresholdsArray";

export const getHistogramScales = (
  data: HistogramDataType<DataType>[],
  horizontalExtent?: [Date, Date],
  dimensions?: [number, number],
  thresholds?: number,
  reducerFunction?: HistogramProps<DataType>["reducerFunction"],
  stackFunction?: HistogramProps<DataType>["stackFunction"]
):
  | {
      xScale: ScaleTime<number, number, never>;
      yScale: ScaleLinear<number, number, never>;
      binnedData: Bin<(typeof data)[0], Date>[];
      stackedData:
        | Series<Bin<HistogramDataType<DataType>, Date>, string>[]
        | undefined;
    }
  | undefined => {
  if (!data) {
    return;
  }

  const flattenedData = data.flatMap((dataRow) =>
    dataRow.eventDate.map((dataRowDate) => ({
      eventDate: dataRowDate,
      occurrenceID: dataRow.occurrenceID,
    }))
  );

  const xExtent =
    horizontalExtent ??
    extent(flattenedData, (dataInstance) => new Date(dataInstance.eventDate));

  if (!xExtent || !xExtent[0] || !xExtent[1]) {
    return;
  }

  const thresholdsArray = getHistogramThresholdsArray(
    xExtent,
    thresholds ?? (histogramParameters.thresholds || 1)
  );
  const binGenerator = bin<(typeof data)[0], Date>()
    .value((dataPoint) => new Date(dataPoint.eventDate[0]))
    .thresholds(thresholdsArray ?? [new Date(0)]);
  const binnedData = binGenerator(data);

  const yMax = max(binnedData, (dataPoint) =>
    reducerFunction ? reducerFunction(dataPoint) : dataPoint.length
  );

  if (!yMax) {
    return;
  }
  const yExtent = [0, yMax];

  const xScale = scaleTime().domain(xExtent);
  const yScale = scaleLinear().domain(yExtent.reverse());

  if (dimensions) {
    const [width, height] = dimensions;
    xScale.range([0, width]);
    yScale.range([0, height]);
  }

  const stackedData = stackFunction
    ? stack<(typeof binnedData)[0]>()
        .keys(
          union(
            binnedData.flatMap((dataBin) =>
              dataBin.map((dataPoint) => stackFunction(dataPoint))
            )
          )
        )
        .value((group, key) => {
          const children = group.filter(
            (groupElement) => stackFunction(groupElement) === key
          );
          const childrenValue = reducerFunction
            ? reducerFunction(children)
            : children.length;
          return childrenValue;
        })
        .order(stackOrderAscending)(binnedData)
    : undefined;

  return { xScale, yScale, binnedData, stackedData };
};
