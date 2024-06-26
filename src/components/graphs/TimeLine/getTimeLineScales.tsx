import * as d3 from "d3";
import { TimelineChartDataType } from "../graphsData.types";
import { TimelineChartPointType } from "../graphsPoints.types";
import { LegendFilterType } from "./TimeLineGraph";

type TimeLineScalesType = [
  d3.ScaleTime<number, number, never>,
  d3.ScaleBand<string>
];

const getXScale = (data: string[]) => {
  const xMin = d3.min(data, (pointObservation) => new Date(pointObservation));
  const xMax = d3.max(data, (pointObservation) => new Date(pointObservation)); // TODO: Can this be improved? Can it be joined into one function? Can it be abstracted?

  if (!xMin || !xMax) return;

  const xExtent = [xMin, xMax.setSeconds(xMax.getSeconds() + 30)];

  return d3.scaleTime().domain(xExtent);
};

const getScales = <T extends TimelineChartDataType[]>(
  data: T
): TimeLineScalesType | undefined => {
  const dateStrings = data.flatMap((dataPoint) => dataPoint.eventDate);
  const xScale = getXScale(dateStrings);
  if (!xScale) return;

  const speciesValues = data.flatMap((dataPoint) => dataPoint.species);
  const yScale = d3.scaleBand().domain(speciesValues);

  return [xScale, yScale];
};

const getDataScaling = (
  scales: TimeLineScalesType,
  groupKey?: LegendFilterType
) => {
  return <T extends TimelineChartDataType>(data: T[]) => {
    const [xScale, yScale] = scales;

    const scaledData = data.map((dataPoint): TimelineChartPointType => {
      const dataPointEventDate = new Date(dataPoint.eventDate);
      const scaledX = xScale(dataPointEventDate);
      const scaledY = yScale(dataPoint.species as string);
      const width =
        xScale(
          new Date(dataPointEventDate).setSeconds(
            dataPointEventDate.getSeconds() + 30
          )
        ) - xScale(new Date(dataPointEventDate));
      const getHeight = (height: number) => height / yScale.domain().length;
      return {
        key: dataPoint.species as string,
        scaledX,
        scaledY: scaledY || 0,
        width,
        getHeight,
        group: dataPoint[groupKey ?? "class"] as string,
        tooltipContent: {
          phylum: dataPoint.phylum as string,
          class: dataPoint.class as string,
          order: dataPoint.order as string,
          family: dataPoint.family as string,
          genus: dataPoint.genus as string,
          species: dataPoint.species as string,
          scientificName: dataPoint.species as string,
          timeDetected: dataPointEventDate.toString(),
          numDetections: dataPoint.observationsNum.toString(),
        },
      };
    });
    return scaledData;
  };
};

export const getTimeLineScales = <T extends TimelineChartDataType[]>(
  data: T | undefined,
  dimensions?: [number, number],
  groupKey?: LegendFilterType
) => {
  if (!data) {
    return;
  }

  const scales = getScales(data);
  if (!scales) return;
  const [xScale, yScale] = scales;

  const scaleData =
    !xScale.domain().length || !yScale.domain().length
      ? () => undefined
      : getDataScaling(scales, groupKey);

  if (dimensions) {
    const [width, height] = dimensions;
    xScale.range([0, width]);
    yScale.range([0, height]);
  }

  return { xScale, yScale, scaleData };
};
