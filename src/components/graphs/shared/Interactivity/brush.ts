import * as d3 from "d3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addBrush = <
  CallbackType extends (event: d3.D3BrushEvent<unknown>, ...args: any) => any
>(
  svg: SVGGElement,
  selector: string,
  brushCallback: CallbackType,
  callbackArguments?: Omit<Parameters<CallbackType>, "event">
) => {
  const lineChartBrush = d3
    .brushX()
    .on("end", (event: d3.D3BrushEvent<unknown>) =>
      brushCallback(event, callbackArguments)
    );
  d3.select(svg).selectAll<SVGGElement, unknown>(selector).call(lineChartBrush);
};
