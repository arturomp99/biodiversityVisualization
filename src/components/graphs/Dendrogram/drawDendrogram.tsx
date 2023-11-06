import * as d3 from "d3";
import { DendrogramChartDataType, TreeDataType } from "./dendrogram.types";
import { dendrogramParameters, graphMargin } from "src/data/constants";
import { dendrogramClassNames } from "src/data/idClassNames";
import { Point, verticalDiagonalLine } from "src/utils/lineEquations";

export const scaleData = (data: TreeDataType, dimensions: [number, number]) => {
  const [dendrogramWidth, dendrogramHeight] = dimensions;
  const root = d3.hierarchy({
    ...data,
    initialPosition: {
      x: 0,
      y: 0,
    },
  });
  return d3
    .tree<DendrogramChartDataType>()
    .nodeSize([12, 12])
    .size([dendrogramWidth, dendrogramHeight])(root);
};

export const drawDendrogram = (
  data: d3.HierarchyPointNode<DendrogramChartDataType>,
  parentRef: SVGSVGElement
) => {
  const dendrogramMarkers = d3
    .select(parentRef)
    .selectAll(`${dendrogramClassNames.markerGroup}`)
    .data(data.descendants())
    .join("g")
    .attr("class", `${dendrogramClassNames.markerGroup}`)
    .attr(
      "transform",
      (dataPoint) =>
        `translate(${dataPoint.x + graphMargin.left}, ${
          dataPoint.y + graphMargin.top
        })`
    );

  dendrogramMarkers
    .selectAll(`.${dendrogramClassNames.markerNode}`)
    .data((singleData) => [singleData])
    .join("circle")
    .attr("class", `.${dendrogramClassNames.markerNode}`)
    .attr("r", dendrogramParameters.nodeParameters.radius);

  dendrogramMarkers
    .selectAll(`.${dendrogramClassNames.markerLabel}`)
    .data((singleData) => [singleData])
    .join("text")
    .text((dataPoint) => dataPoint.data.name)
    .attr("class", `.${dendrogramClassNames.markerLabel}`);

  d3.select(parentRef)
    .selectAll(".markerLink")
    .data(data.descendants().slice(1))
    .join("path")
    .attr("d", (dataPoint) =>
      verticalDiagonalLine(dataPoint.parent as Point, dataPoint)
    )
    .attr("transform", `translate(${graphMargin.left}, ${graphMargin.top})`)
    .attr("class", "markerLink")
    .attr("fill", "none")
    .attr("stroke", "black");

  dendrogramMarkers.join("circle");
  return;
};
