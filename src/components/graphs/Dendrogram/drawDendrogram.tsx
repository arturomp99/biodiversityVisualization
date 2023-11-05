import * as d3 from "d3";
import { DendrogramDataType } from "./dendrogram.types";
import { dendrogramParameters, graphMargin } from "src/data/constants";
import { dendrogramClassNames } from "src/data/idClassNames";

export const scaleData = (
  data: DendrogramDataType,
  dimensions: [number, number]
) => {
  const [dendrogramWidth, dendrogramHeight] = dimensions;
  const root = d3.hierarchy(data);
  return d3
    .tree<DendrogramDataType>()
    .nodeSize([12, 12])
    .size([dendrogramWidth, dendrogramHeight])(root);
};

export const drawDendrogram = (
  data: d3.HierarchyPointNode<DendrogramDataType>,
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

  // dendrogramMarkers
  //   .selectAll(".markerLink")
  //   .data(data.descendants().slice(1))
  //   .join("path")
  //   .attr("d", (dataPoint)=>);

  dendrogramMarkers.join("circle");
  return;
};
