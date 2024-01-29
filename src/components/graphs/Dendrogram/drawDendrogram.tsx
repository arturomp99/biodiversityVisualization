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
    })
    .each((dataPoint, index, nodesGroup) => {
      // We point to each child svg node from parent
      if (!dataPoint.parent) return;
      dataPoint.parent.childrenNodes = [
        ...(dataPoint.parent?.childrenNodes || []),
        nodesGroup[index],
      ];
    });

  const dendrogramNodes = dendrogramMarkers
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

  dendrogramNodes.on("click", (_, dataPoint) => {
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
  // dendrogramMarkers
  //   .selectAll(`.${dendrogramClassNames.markerLabel}`)
  //   .data((singleData) => [singleData])
  //   .join("text")
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   .text((dataPoint: any) => dataPoint.name || dataPoint.data[0] || "")
  //   .attr("class", `${dendrogramClassNames.markerLabel}`);

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
    .attr("stroke", "black");

  return;
};
