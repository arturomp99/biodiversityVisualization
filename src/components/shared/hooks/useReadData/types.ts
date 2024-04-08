import { TaxonomicLevelsType } from "src/data/data.types";

export type FiltersDataType = {
  taxonomic?: Record<TaxonomicLevelsType, string[]>;
  temporal?: (Date | undefined)[];
  drop?: string[];
  confidence?: number;
};
