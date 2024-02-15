import * as d3 from "d3";
import { TreeDataType, TreeNode } from "./dendrogram.types";
import { dendrogramParameters, graphMargin } from "src/data/constants";
import { dendrogramClassNames } from "src/data/idClassNames";
import { verticalDiagonalLine } from "src/utils/lineEquations";
import {
  hideNodeInfoInteractivity,
  showNodeInfoInteractivity,
} from "./interactivtiy/showNodeInfoInteractivity";

const setInitialState = (
  root: TreeNode<TreeDataType>,
  parentCoordinates?: { x?: number; y?: number }
) => {
  root.x0 = parentCoordinates?.x ?? root.x;
  root.y0 = parentCoordinates?.y ?? root.y;
  if (!root.children) return;
  root.expanded
    ? root.children.forEach((childNode) => setInitialState(childNode))
    : root.children.forEach((childNode) =>
        setInitialState(childNode, { x: root.x0, y: root.y0 })
      );
};

export const scaleData = (data: TreeDataType, dimensions: [number, number]) => {
  const [dendrogramWidth, dendrogramHeight] = dimensions;

  const root = d3.hierarchy<TreeDataType>(data);
  root.count(); // Counts the num of leaves on each branch => Populating the value property on each node

  const treeStructure = d3
    .tree<TreeDataType>()
    .nodeSize([12, 12])
    .size([dendrogramWidth, dendrogramHeight])(root) as TreeNode<TreeDataType>;

  // Expand  1st level
  treeStructure.expanded = true;

  setInitialState(treeStructure); // TODO: Memoize => Expensive operation
  return treeStructure;
};

export const drawDendrogram = (
  data: TreeNode<TreeDataType>,
  parentRef: SVGSVGElement
) => {
  console.log(
    d3
      .select(parentRef)
      .selectAll<typeof parentRef, typeof data>(
        `.${dendrogramClassNames.markerGroup}`
      )
  );
  const dendrogramMarkers = d3
    .select(parentRef)
    .selectAll<SVGGElement, typeof data>(`.${dendrogramClassNames.markerGroup}`)
    .data(
      data.descendants(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dataPoint: any) => dataPoint.data.id //dataPoint.data.species || dataPoint.data[0] || "root"
    );

  const dendrogramMarkersEnter = dendrogramMarkers
    .enter()
    .append("g")
    .attr("class", `${dendrogramClassNames.markerGroup}`)
    .attr(
      "id",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dataPoint: any) => {
        return dataPoint.data.species || dataPoint.data[0] || "root";
      }
    )
    .attr("transform", (dataPoint) => {
      const position = {
        x: dataPoint.x0 ?? dataPoint.x,
        y: dataPoint.y0 ?? dataPoint.y,
      };
      return `translate(${position.x + graphMargin.left}, ${
        position.y + graphMargin.top
      })`;
    });

  dendrogramMarkersEnter
    .selectAll<SVGSVGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerLink}`
    )
    .data((singleData) => [singleData])
    .join("path")
    .attr("class", `${dendrogramClassNames.markerLink}`)
    .attr("d", (dataPoint) => {
      if (!dataPoint.parent) return null;
      return dataPoint.parent.expanded
        ? verticalDiagonalLine(
            { x: 0, y: 0 },
            {
              x: dataPoint.parent.x - dataPoint.x,
              y: dataPoint.parent.y - dataPoint.y,
            }
          )
        : verticalDiagonalLine({ x: 0, y: 0 }, { x: 0, y: 0 });
    })
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", "1px");

  const markersCircles = dendrogramMarkersEnter
    .selectAll<SVGSVGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerNode}`
    )
    .data((singleData) => [singleData])
    .join("circle")
    .attr("class", `${dendrogramClassNames.markerNode}`)
    .attr("r", (dataPoint) =>
      dataPoint.expanded || (dataPoint.parent && dataPoint.parent.expanded)
        ? dendrogramParameters.nodeParameters.radius
        : dendrogramParameters.nodeParameters.radiusCollapsed
    )
    .attr("fill", dendrogramParameters.nodeParameters.color);

  markersCircles
    .on(
      "mouseover",
      function (
        this: SVGSVGElement | SVGCircleElement,
        _,
        data: TreeNode<TreeDataType>
      ) {
        showNodeInfoInteractivity(this, data);
      }
    )
    .on(
      "mouseout",
      function (
        this: SVGSVGElement | SVGCircleElement,
        _,
        data: TreeNode<TreeDataType>
      ) {
        hideNodeInfoInteractivity(this, data);
      }
    );

  const dendrogramMarkersUpdate = dendrogramMarkers.attr(
    "transform",
    (dataPoint) => {
      const position = {
        x: dataPoint.x0 ?? dataPoint.x,
        y: dataPoint.y0 ?? dataPoint.y,
      };
      return `translate(${position.x + graphMargin.left}, ${
        position.y + graphMargin.top
      })`;
    }
  );

  dendrogramMarkersEnter.merge(dendrogramMarkersUpdate);
  dendrogramMarkers.exit().remove();

  return;
};
