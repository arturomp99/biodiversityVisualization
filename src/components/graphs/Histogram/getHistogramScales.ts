import { extent, max, scaleTime, scaleLinear, bin } from "d3";
import type { ScaleTime, ScaleLinear, Bin } from "d3";
import { HistogramDataType } from "..";
import { DataType } from "src/data/data.types";
import { histogramParameters } from "src/data/constants";
import { getHistogramThresholdsArray } from "src/utils/getHistogramThresholdsArray";

export const getHistogramScales = (
  data: HistogramDataType<DataType>[],
  horizontalExtent?: [Date, Date],
  dimensions?: [number, number],
  thresholds?: number
):
  | {
      xScale: ScaleTime<number, number, never>;
      yScale: ScaleLinear<number, number, never>;
      binnedData: Bin<Pick<DataType, "occurrenceID" | "eventDate">, Date>[];
    }
  | undefined => {
  if (!data) {
    return;
  }

  const flattenedData = data.flatMap((dataRow) =>
    (dataRow.eventDate as string[]).map((dataRowDate) => ({
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
  const binGenerator = bin<Pick<DataType, "eventDate" | "occurrenceID">, Date>()
    .value((dataPoint) => new Date(dataPoint.eventDate as string))
    .thresholds(thresholdsArray ?? [new Date(0)]);
  const binnedData = binGenerator(data);

  const yMax = max(binnedData, (dataPoint) => dataPoint.length);

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

  return { xScale, yScale, binnedData };
};
