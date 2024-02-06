import * as d3 from "d3";

import { dendrogramClassNames } from "src/data/idClassNames";
import { dendrogramParameters } from "src/data/constants";
import { TreeDataType, TreeNode } from "../dendrogram.types";

export const dendrogramHandleZoomEnd = (
  event: d3.D3ZoomEvent<SVGSVGElement, unknown>
) => {
  const transition = d3
    .selectAll<SVGGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerGroup}`
    )
    .filter((dataPoint) => !dataPoint?.parent || !!dataPoint.parent.expanded)
    .transition()
    .duration(dendrogramParameters.transitions.zoomEndTransitionDuration);

  transition
    .selectChild(`.${dendrogramClassNames.markerNode}`)
    .attr("r", dendrogramParameters.nodeParameters.radius / event.transform.k);

  transition
    .selectChild(`.${dendrogramClassNames.markerLink}`)
    .attr(
      "stroke-width",
      `${dendrogramParameters.linkParameters.strokeWidth / event.transform.k}px`
    ); // Modify strokeWidth to default one
};
