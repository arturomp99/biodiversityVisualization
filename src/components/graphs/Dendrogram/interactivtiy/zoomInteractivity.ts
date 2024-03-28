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

  const markerLabel = transition.selectChild(
    `.${dendrogramClassNames.markerLabel}`
  );
  markerLabel
    .selectChild<SVGTextElement, unknown>("text")
    .attr(
      "font-size",
      `${
        (dendrogramParameters.labels.fontSizeRatio *
          dendrogramParameters.nodeParameters.radius) /
        event.transform.k
      }px`
    );
  markerLabel
    .selectChild<SVGRectElement, unknown>("rect")
    .attr("width", function () {
      return (
        d3
          .select(this.parentElement)
          .select<SVGTextElement>("text")
          .node()
          ?.getBBox().width || 0
      );
    })
    .attr("height", function () {
      return (
        d3
          .select(this.parentElement)
          .select<SVGTextElement>("text")
          .node()
          ?.getBBox().height || 0
      );
    })
    .attr("transform", function () {
      const fontSize =
        (dendrogramParameters.labels.fontSizeRatio *
          dendrogramParameters.nodeParameters.radius) /
        event.transform.k;
      const labelWidth: number =
        d3
          .select(this.parentElement)
          .select<SVGTextElement>("text")
          .node()
          ?.getBBox().width || 0;
      const labelHeight =
        d3
          .select(this.parentElement)
          .select<SVGTextElement>("text")
          .node()
          ?.getBBox().height || 0;
      return `translate(${
        -labelWidth / 2
      }, ${-(labelHeight - 0.2 * fontSize)})`;
    });
};
