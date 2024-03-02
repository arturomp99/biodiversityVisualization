import * as d3 from "d3";
import { TreeDataType, TreeNode } from "../dendrogram.types";
import { dendrogramClassNames } from "src/data/idClassNames";
import { dendrogramParameters } from "src/data/constants";

const addLabel = (
  element: HTMLElement | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any
): void => {
  const fontSize =
    dendrogramParameters.labels.fontSizeRatio *
    +d3.select(element).select(`.${dendrogramClassNames.markerNode}`).attr("r");

  console.log(fontSize);

  const label = d3
    .select(element)
    .append("g")
    .attr("class", dendrogramClassNames.markerLabel)
    .attr("transform", `translate(0,-${fontSize})`);
  const labelText = label
    .append("text")
    .text(node.name || node.data[0] || "")
    .attr("class", dendrogramClassNames.markerLabel)
    .attr("fill", dendrogramParameters.labels.fontColor)
    .attr("font-size", `${fontSize}px`)
    .attr("text-anchor", "middle");

  const labelWidth = labelText.node()?.getBBox().width || 0;
  const labelHeight = labelText.node()?.getBBox().height || 0;
  label
    .append("rect")
    .attr("width", labelWidth)
    .attr("height", labelHeight)
    .attr(
      "transform",
      `translate(${-labelWidth / 2}, ${-(labelHeight - 0.2 * fontSize)})`
    )
    .style("fill", "white")
    .style("opacity", "0.9");

  labelText.raise();
};

const recursivelyAddLabel = (
  element: HTMLElement | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any
): void => {
  addLabel(element, node);
  if (node.parent) recursivelyAddLabel(node.parentNode, node.parent);
  return;
};

const recursivelyColorNodes = (
  element: HTMLElement | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
  color: string
): void => {
  d3.select(element)
    .select(`.${dendrogramClassNames.markerNode}`)
    .attr("fill", color);
  if (node.parent) recursivelyColorNodes(node.parentNode, node.parent, color);
};

export const showNodeInfoInteractivity = (
  element: SVGSVGElement | SVGCircleElement,
  data: TreeNode<TreeDataType>
) => {
  recursivelyAddLabel(element.parentElement, data);
  recursivelyColorNodes(
    element.parentElement,
    data,
    dendrogramParameters.nodeParameters.distinguishedColor
  );
  d3.select(element.parentElement).raise();
};

const removeLabel = (element: HTMLElement | null): void => {
  d3.select(element).select(`.${dendrogramClassNames.markerLabel}`).remove();
};

const recursivelyRemoveLabel = (
  element: HTMLElement | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any
): void => {
  removeLabel(element);
  if (node.parent) recursivelyRemoveLabel(node.parentNode, node.parent);
  return;
};

export const hideNodeInfoInteractivity = (
  element: SVGSVGElement | SVGCircleElement,
  data: TreeNode<TreeDataType>
) => {
  recursivelyRemoveLabel(element.parentElement, data);
  recursivelyColorNodes(
    element.parentElement,
    data,
    dendrogramParameters.nodeParameters.color
  );
};
