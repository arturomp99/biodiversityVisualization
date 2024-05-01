import { DataType } from "src/data/data.types";
import { NumericHistogramProps } from "../../graphsProps.types";
import { NumericHistogramDataType } from "../..";
import {
  bin,
  extent,
  max,
  scaleLinear,
  stack,
  stackOrderAscending,
  union,
  type Bin,
  type ScaleLinear,
  type Series,
} from "d3";

const getThresholds = (extent: [number, number], step: number) => {
  let thresholds: number[] = [extent[1]];

  while (thresholds[0] > extent[0]) {
    thresholds = [thresholds[0] - step, ...thresholds];
  }

  return thresholds;
};

export const getNumericHistogramScales = (
  data: NumericHistogramProps<DataType>["data"],
  binFunction: NumericHistogramProps<DataType>["binFunction"],
  horizontalExtent?: NumericHistogramProps<DataType>["xExtent"],
  dimensions?: [number, number],
  step?: number,
  reducerFunction?: NumericHistogramProps<DataType>["reducerFunction"],
  stackFunction?: NumericHistogramProps<DataType>["stackFunction"]
):
  | {
      xScale: ScaleLinear<number, number, never>;
      yScale: ScaleLinear<number, number, never>;
      binnedData: Bin<(typeof data)[0], number>[];
      stackedData:
        | Series<Bin<NumericHistogramDataType<DataType>, number>, string>[]
        | undefined;
      xExtent: number[];
    }
  | undefined => {
  if (!data) {
    return;
  }

  const flattenedData = data.flatMap((dataRow) => ({
    value: binFunction(dataRow),
    occurrenceID: dataRow.occurrenceID,
  }));
  const xExtent =
    horizontalExtent ??
    extent(flattenedData, (dataInstance) => dataInstance.value);
  if (!xExtent || xExtent[0] === undefined || xExtent[1] === undefined) {
    return;
  }

  const binGenerator = bin<(typeof data)[0], number>()
    .value((dataPoint) => binFunction(dataPoint))
    .domain(xExtent)
    .thresholds(getThresholds(xExtent, step ?? 0.1));
  const binnedData = binGenerator(data);

  const yMax = max(binnedData, (dataPoint) =>
    reducerFunction ? reducerFunction(dataPoint) : dataPoint.length
  );

  if (!yMax) {
    return;
  }
  const yExtent = [0, yMax];

  const xScale = scaleLinear().domain(xExtent);
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
  return { xScale, yScale, binnedData, stackedData, xExtent };
};
