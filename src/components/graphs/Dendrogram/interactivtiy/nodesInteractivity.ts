import * as d3 from "d3";
import { dendrogramClassNames } from "src/data/idClassNames";
import { TreeDataType, TreeNode } from "../dendrogram.types";
import { dendrogramParameters, graphMargin } from "src/data/constants";
import { verticalDiagonalLine } from "src/utils/lineEquations";

const collapseTransition = (
  selection: d3.Selection<
    SVGGElement,
    TreeNode<TreeDataType>,
    SVGSVGElement,
    unknown
  >,
  parentCoordinates: [number, number]
) => {
  const transition = selection
    .filter((dataPoint) => dataPoint.action === "collapse")
    .each((dataPoint) => (dataPoint.action = undefined))
    .transition()
    .duration(dendrogramParameters.transitions.collapseDuration)
    .attr(
      "transform",
      `translate(${parentCoordinates.toString()}) translate(${
        graphMargin.left
      } ${graphMargin.top})`
    );

  transition
    .selectChild(`.${dendrogramClassNames.markerNode}`)
    .attr("r", dendrogramParameters.nodeParameters.radiusCollapsed);

  transition
    .selectChild<SVGSVGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerLink}`
    )
    .attr("d", (dataPoint) => {
      if (!dataPoint.parent) return null;
      return verticalDiagonalLine(
        { x: 0, y: 0 },
        {
          x: 0,
          y: 0,
        }
      );
    });
};

const expandTransition = (
  selection: d3.Selection<
    SVGGElement,
    TreeNode<TreeDataType>,
    SVGSVGElement,
    unknown
  >
) => {
  const transition = selection
    .filter((dataPoint) => dataPoint.action === "expand")
    .each((dataPoint) => (dataPoint.action = undefined))
    .transition()
    .duration(dendrogramParameters.transitions.collapseDuration)
    .attr(
      "transform",
      (dataPoint) =>
        `translate(${dataPoint.x},${dataPoint.y}) translate(${graphMargin.left} ${graphMargin.top})`
    );

  transition
    .selectChild(`.${dendrogramClassNames.markerNode}`)
    .attr("r", dendrogramParameters.nodeParameters.radius);

  transition
    .selectChild<SVGSVGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerLink}`
    )
    .attr("d", (dataPoint) => {
      if (!dataPoint.parent) return null;
      return verticalDiagonalLine(
        { x: 0, y: 0 },
        {
          x: dataPoint.parent.x - dataPoint.x,
          y: dataPoint.parent.y - dataPoint.y,
        }
      );
    });

  transition.on(
    "end",
    (dataPoint) =>
      dataPoint.childrenNodes &&
      dataPoint.childrenNodes.forEach((childNode) => {
        d3.select(childNode).attr(
          "transform",
          `translate(${dataPoint.x},${dataPoint.y}) translate(${graphMargin.left} ${graphMargin.top})`
        );
      })
  );
};

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
const expandNode = (node: TreeNode<TreeDataType>): void => {
  node.children &&
    node.children.forEach((childNode) => {
      childNode.action = "expand";
      childNode.expanded && expandNode(childNode);
    });
  return;
};

export const makeNodesCollapsible = (parentRef: SVGSVGElement) => {
  const dendrogramMarkers = d3
    .select(parentRef)
    .selectAll<SVGGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerGroup}`
    )
    .each((dataPoint, index, nodesGroup) => {
      // We point to each child svg node from parent
      if (!dataPoint.parent) return;
      dataPoint.parent.childrenNodes = [
        ...(dataPoint.parent?.childrenNodes || []),
        nodesGroup[index],
      ];
    });

  dendrogramMarkers
    .selectAll<SVGSVGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerNode}`
    )
    .on("click", (_, dataPoint) => {
      if (!dataPoint.children) {
        console.log("CLICKED A LEAF"); // TODO: TRIGGER AN ACTION
        return;
      }
      if (dataPoint.expanded) {
        dataPoint.expanded = false;
        collapseNode(dataPoint);
        collapseTransition(dendrogramMarkers, [dataPoint.x, dataPoint.y]);
        return;
      }
      dataPoint.expanded = true;
      expandNode(dataPoint);
      expandTransition(dendrogramMarkers);
    });
};
