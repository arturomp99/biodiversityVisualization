import * as d3 from "d3";
import { TreeDataType, TreeNode } from "./dendrogram.types";
import { dendrogramParameters, graphMargin } from "src/data/constants";
import { dendrogramClassNames } from "src/data/idClassNames";
import { Point, verticalDiagonalLine } from "src/utils/lineEquations";

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

const collapseTransition = (
  selection: d3.Selection<
    SVGGElement,
    TreeNode<TreeDataType>,
    SVGSVGElement,
    unknown
  >,
  parentCoordinates: [number, number]
) => {
  console.log("parentCoordinates", parentCoordinates.toString());
  selection
    .filter((dataPoint) => dataPoint.action === "collapse")
    .each((dataPoint) => (dataPoint.action = undefined))
    .transition()
    .duration(500)
    .attr("transform", `translate(${parentCoordinates.toString()})`);
};

// const expandTransition = (
//   selection: d3.Selection<
//     SVGGElement,
//     TreeNode<TreeDataType>,
//     SVGSVGElement,
//     unknown
//   >
// ) => {
//   selection
//     .filter((dataPoint) => dataPoint.action === "expand")
//     .each((dataPoint) => (dataPoint.action = undefined))
//     .transition()
//     .duration(500)
//     .attr("transform", "translate(150,150)");
// };

/**
 *
 * @param node
 * @param nodeElement
 * @returns void
 * Collapses a certain node of the tree,
 * making sure that its children are also collapsed
 */
const collapseNode = (node: TreeNode<TreeDataType>): void => {
  node.children &&
    node.children.forEach((childNode) => {
      childNode.action = "collapse";
      childNode.children && collapseNode(childNode);
    });
  return;
};

/**
 *
 * @param node
 * @param nodeElement
 * @returns void
 * Expands a certain node in the tree,
 * making sure that its children keep their state:
 * - If they were collapsed they remain collapsed
 * - If they were expanded, they remain expanded
 */
const expandNode = (
  node: TreeNode<TreeDataType>,
  nodeElement?: SVGSVGElement
): void => {
  if (nodeElement) console.log("ELEMENT CLICKED", nodeElement);
  if (!node.childrenNodes || !node.children || !node.expanded) return;

  node.children.forEach((childNode) => expandNode(childNode));
  node.childrenNodes.forEach((childNode) => {
    d3.select(childNode).attr("fill", "blue");
  });
  return;
};

export const scaleData = (data: TreeDataType, dimensions: [number, number]) => {
  const [dendrogramWidth, dendrogramHeight] = dimensions;

  const root = d3.hierarchy<TreeDataType>(data);
  root.count(); // Counts the num of leaves on each branch => Populating the value property on each node

  const treeStructure = d3
    .tree<TreeDataType>()
    .nodeSize([12, 12])
    .size([dendrogramWidth, dendrogramHeight])(root) as TreeNode<TreeDataType>;

  treeStructure.expanded = true; // Expand  1st level
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
    })
    .each((dataPoint, index, nodesGroup) => {
      if (!dataPoint.parent) return;
      dataPoint.parent.childrenNodes = [
        ...(dataPoint.parent?.childrenNodes || []),
        nodesGroup[index],
      ];
    });
  dendrogramMarkers.on("click", (event, dataPoint) => {
    if (!dataPoint.children) {
      console.log("CLICKED A LEAF");
      return;
    }
    if (dataPoint.expanded) {
      dataPoint.expanded = false;
      collapseNode(dataPoint);
      collapseTransition(dendrogramMarkers, [dataPoint.x, dataPoint.y]);
      return;
    }
    dataPoint.expanded = true;
    expandNode(dataPoint, event.target);
  });

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
    .text((dataPoint) => {
      return typeof dataPoint.data === "object"
        ? dataPoint.name
        : dataPoint.data[0] || "";
    })
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
