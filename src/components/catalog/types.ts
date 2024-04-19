import { ReactNode } from "react";
import { DataType } from "src/data/data.types";

export type CatalogContainerProps = {
  children: ReactNode;
};

export type TotalCatalogInfoType = {
  totalAnimals?: number;
  totalPages?: number;
};

export type CatalogDataType = DataType & {
  species?: string;
  molInfo?: MOLResult;
  xenoCantoResult?: XenoCantoRecordingType;
  wikipediaResult?: WikipediaResultType;
  gbifVernacularName?: GBIFVernacularNamesType["results"][0];
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

type MOLResult = {
  info: [
    {
      content: string;
      source: string;
      lang: string;
    }
  ];
  rangemap: string;
  family: [{ lang: string; name: string }];
  taxa: string;
  commonname: string;
  redlist_link: string;
  scientificname: string;
  image: { url: string };
};

type WikipediaResultType = {
  pageId: number;
  title: string;
  thumbnail: { source: string };
  description: string;
  fullurl: string;
};

type GBIFVernacularNamesType = {
  results: { vernacularName: string; language: string }[];
};
