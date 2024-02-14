import * as d3 from "d3";
import { TreeDataType, TreeNode } from "./dendrogram.types";
import { dendrogramParameters, graphMargin } from "src/data/constants";
import { dendrogramClassNames } from "src/data/idClassNames";
import { verticalDiagonalLine } from "src/utils/lineEquations";

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

const addLabel = (
  element: SVGSVGElement | SVGCircleElement,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any
): void => {
  const label = d3
    .select(element.parentElement)
    .append("g")
    .attr("class", dendrogramClassNames.markerLabel)
    .attr(
      "transform",
      `translate(0,-${1.5 * dendrogramParameters.nodeParameters.radius})`
    );
  const labelText = label
    .append("text")
    .text(node.name || node.data[0] || "")
    .attr("class", dendrogramClassNames.markerLabel)
    .attr("fill", dendrogramParameters.labels.fontColor)
    .attr("font-size", `${dendrogramParameters.labels.fontSize}px`)
    .attr("text-anchor", "middle");

  const labelWidth = labelText.node()?.getBBox().width || 0;
  const labelHeight = labelText.node()?.getBBox().height || 0;
  label
    .append("rect")
    .attr("width", labelWidth)
    .attr("height", labelHeight)
    .attr(
      "transform",
      `translate(-${labelWidth / 2}, -${
        labelHeight - 0.2 * dendrogramParameters.labels.fontSize
      })`
    )
    .style("fill", "white")
    .style("opacity", "0.9");

  labelText.raise();
};

const removeLabel = (element: SVGSVGElement | SVGCircleElement): void => {
  console.log(element);
  d3.select(element.parentElement)
    .select(`.${dendrogramClassNames.markerLabel}`)
    .remove();
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
  const dendrogramMarkers = d3
    .select(parentRef)
    .selectAll<typeof parentRef, typeof data>(
      `${dendrogramClassNames.markerGroup}`
    )
    .data(
      data.descendants(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dataPoint: any) => dataPoint.data.species || dataPoint.data[0] || "root"
    )
    .enter()
    .append("g")
    .attr("class", `${dendrogramClassNames.markerGroup}`)
    .attr(
      "id",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dataPoint: any) => dataPoint.data.species || dataPoint.data[0] || "root"
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

  dendrogramMarkers
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

  const markersCircles = dendrogramMarkers
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
    );

  markersCircles
    .on(
      "mouseover",
      function (
        this: SVGSVGElement | SVGCircleElement,
        _,
        data: TreeNode<TreeDataType>
      ) {
        addLabel(this, data);
      }
    )
    .on("mouseout", function (this: SVGSVGElement | SVGCircleElement) {
      removeLabel(this);
    });

  return;
};
