import { ReactNode } from "react";
import { DataType } from "src/data/data.types";

export type CatalogContainerProps = {
  children: ReactNode;
};

export type TotalCatalogInfoType = {
  totalAnimals?: number;
  totalPages?: number;
};

type XenoCantoRecordingType = {
  id: string;
  get: string;
  sp: string;
  group: string;
  en: string;
  rec: string;
  cnt: string;
  loc: string;
  type: string;
  sex: string;
  stage: string;
  file: string;
  date: string;
};

export type CatalogDataType = DataType & {
  species?: string;
  usageKey?: string;
  vernacularName?: string;
  descriptions?: GBIFDescriptionType["results"];
  wikipediaResult?: WikipediaResultType;
  xenoCantoResult: XenoCantoRecordingType;
};

type GBIFDescriptionType = {
  results: {
    type:
      | "conservation"
      | "discussion"
      | "distribution"
      | "materials_examined"
      | "activity"
      | "biology_ecology"
      | "breeding"
      | "description"
      | "food_feeding"
      | "vernacular_names";
    description: string;
    source: string;
  }[];
};

type WikipediaResultType = {
  pageId: number;
  title: string;
  thumbnail: { source: string };
  description: string;
  fullurl: string;
};
