import * as d3 from "d3";
import { dendrogramClassNames } from "src/data/idClassNames";
import { TreeDataType, TreeNode } from "../../dendrogram.types";
import { addLabel } from "./showNodeInfoInteractivity";

export const removeNodeInfoInteractivity = (parentRef: SVGSVGElement) => {
  d3.select(parentRef)
    .selectAll(`.${dendrogramClassNames.markerGroup}`)
    .selectAll<SVGSVGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerNode}`
    )
    .each(function (data) {
      addLabel(this.parentElement, data);
    })
    .on("mouseover", null)
    .on("mouseout", null);
};
