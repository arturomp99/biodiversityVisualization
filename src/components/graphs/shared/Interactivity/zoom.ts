import * as d3 from "d3";
import { dendrogramClassNames } from "src/data/idClassNames";
import { TreeDataType, TreeNode } from "../../Dendrogram/dendrogram.types";
import { dendrogramParameters } from "src/data/constants";

export const addZoom = (
  svg: SVGSVGElement,
  zoomContainer: SVGSVGElement,
  extent: [number, number]
) => {
  const handleZoom = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
    d3.select(zoomContainer).attr("transform", event.transform.toString());
  };

  const handleZoomEnd = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
    const transition = d3
      .selectAll<SVGGElement, TreeNode<TreeDataType>>(
        `.${dendrogramClassNames.markerGroup}`
      )
      .filter((dataPoint) => !dataPoint?.parent || !!dataPoint.parent.expanded)
      .transition()
      .duration(dendrogramParameters.transitions.zoomEndTransitionDuration);

    transition
      .selectChild(`.${dendrogramClassNames.markerNode}`)
      .attr(
        "r",
        dendrogramParameters.nodeParameters.radius / event.transform.k
      );

    transition
      .selectChild(`.${dendrogramClassNames.markerLink}`)
      .attr(
        "stroke-width",
        `${
          dendrogramParameters.linkParameters.strokeWidth / event.transform.k
        }px`
      ); // Modify strokeWidth to default one
  };

  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent(extent)
    .on("zoom", handleZoom)
    .on("end", handleZoomEnd);

  d3.select(svg).call(zoom);
};
