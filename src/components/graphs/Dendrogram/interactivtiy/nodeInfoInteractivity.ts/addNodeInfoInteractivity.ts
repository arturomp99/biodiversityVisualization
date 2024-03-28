import * as d3 from "d3";
import { dendrogramClassNames } from "src/data/idClassNames";
import { TreeDataType, TreeNode } from "../../dendrogram.types";
import {
  hideNodeInfoInteractivity,
  showNodeInfoInteractivity,
} from "./showNodeInfoInteractivity";

export const addNodeInfoInteractivity = (parentRef: SVGSVGElement) => {
  d3.select(parentRef)
    .selectAll(`.${dendrogramClassNames.markerLabel}`)
    .remove();
  d3.select(parentRef)
    .selectAll(`.${dendrogramClassNames.markerGroup}`)
    .selectAll<SVGSVGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerNode}`
    )
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
};
