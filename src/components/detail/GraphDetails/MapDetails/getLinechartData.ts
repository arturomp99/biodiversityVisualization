import { group } from "d3";
import { LineChartDataType } from "src/components/graphs";
import { DataType } from "src/data/data.types";

export const getLinechartData = (
  data: DataType[] | undefined
): LineChartDataType[] | undefined => {
  if (!data) {
    return;
  }
  const timeData: LineChartDataType[] = data.flatMap((dataRow) => {
    return dataRow.eventDate.map((date) => ({
      timeStamp: new Date(date).getTime(),
      value: 1,
      group: dataRow.dropId as string,
    }));
  });

  const reducedData = timeData
    .sort((dataA, dataB) => dataA.timeStamp - dataB.timeStamp)
    .reduce<Array<LineChartDataType>>(
      (result: LineChartDataType[], currentObject) => {
        const existingTime = result.find(
          (item) =>
            item.timeStamp === currentObject.timeStamp &&
            item.group === currentObject.group
        );
        existingTime
          ? (existingTime.value += currentObject.value)
          : result.push(currentObject);
        return result;
      },
      []
    );

  const cummulativeData = Array.from(
    group(reducedData, (dataRow) => dataRow.group).values()
  ).map((groupedData) => {
    const groupedCummulative = groupedData.reduce(
      (acc: LineChartDataType[], currentObject) => {
        const lastValue = acc.length > 0 ? acc[acc.length - 1].value : 0;
        const cumulativeValue = lastValue + currentObject.value; // Calculate cumulative value
        acc.push({ ...currentObject, value: cumulativeValue }); // Add to accumulator with cumulative value
        return acc;
      },
      []
    );
    return groupedCummulative;
  });

  return cummulativeData.flat();
};
