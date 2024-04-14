import * as d3 from "d3";
import tippy, { Instance, Props } from "tippy.js";
import { dendrogramClassNames } from "src/data/idClassNames";
import { TreeDataType, TreeNode } from "../dendrogram.types";
import { DataType } from "src/data/data.types";
import config from "src/config.json";
import { CatalogDataType } from "src/components/catalog/types";

const setTooltip = async (nodeData: DataType, instance: Instance<Props>) => {
  const catalogContent = (await (
    await fetch(
      config.BACKEND_URL +
        config.CATALOG_SPECIES_KEY +
        nodeData.scientificName.replace(" ", "-")
    )
  ).json()) as CatalogDataType;

  instance.setContent(`
        <div class="tippy-content" style="display: flex; flex-direction: column ;gap: 0.2rem; align-items: center">
            <strong style="margin: auto">${
              catalogContent.vernacularName ?? catalogContent.scientificName
            }</strong><hr style="width: 100%"/>
            <p>${catalogContent.scientificName}</p><br/>
            ${
              catalogContent.wikipediaResult?.thumbnail.source &&
              `<img 
                    src="${catalogContent.wikipediaResult?.thumbnail.source}" style="max-height: 15rem"
                />`
            }
        </div>
    `);
};

export const addLeavesTooltip = (parentRef: SVGSVGElement) => {
  d3.select(parentRef)
    .selectAll<SVGSVGElement, TreeNode<TreeDataType>>(
      `.${dendrogramClassNames.markerNode}`
    )
    .each(function (dataPoint) {
      if (!dataPoint.children) {
        tippy(this, {
          content: "Loading... ",
          allowHTML: true,
          theme: "light",
          trigger: "click",
          placement: "bottom",
          onShow: (instance) => {
            setTooltip(dataPoint.data as unknown as DataType, instance);
          },
        });
      }
    });
};
