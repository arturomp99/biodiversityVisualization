import {
  gbifGetSlugs,
  gbifSpeciesAPIUrl,
  vernacularNamesQuery,
} from "src/data/catalogAPI";
import { catalogParameters } from "src/data/constants";

type GBIFNameMatchType = { usageKey: number };

export const getUsageKey = async (
  species: string
): Promise<GBIFNameMatchType> => {
  const response = await fetch(
    gbifSpeciesAPIUrl + gbifGetSlugs.nameMatch(species)
  );
  if (!response.ok)
    throw new Error(`Failed to match scientificName ${species}`);

  return await response.json();
};

type GBIFVernacularNamesType = {
  results: { vernacularName: string; language: string }[];
};

export const getVernacularNames = async (
  usageKey: number
): Promise<GBIFVernacularNamesType> => {
  const response = await fetch(
    gbifSpeciesAPIUrl +
      gbifGetSlugs.vernacularName(usageKey, {
        limit: vernacularNamesQuery.limit,
        offset: vernacularNamesQuery.offset,
      })
  );
  if (!response.ok)
    throw new Error(`Failed to get vernacular name for usage key ${usageKey}`);

  return await response.json();
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

export const getDescription = async (
  usageKey: number
): Promise<GBIFDescriptionType> => {
  const response = await fetch(
    gbifSpeciesAPIUrl + gbifGetSlugs.description(usageKey)
  );
  if (!response.ok)
    throw new Error(
      `Failed to get description comments for usage key ${usageKey}`
    );

  return await response.json();
};

type GBIFImageType = {
  results?: {
    type: string; // TODO: Check that it is a valid type. Which types can be returned?
    format: string; // TODO: Which formats can be returned?
    description?: string;
    identifier: string;
  }[];
};

export const getImages = async (usageKey: number): Promise<GBIFImageType> => {
  const response = await fetch(
    gbifSpeciesAPIUrl +
      gbifGetSlugs.image(usageKey, {
        limit: catalogParameters.gbifImagesCount,
        offset: 0,
      })
  );
  if (!response.ok)
    throw new Error(
      `Failed to get description comments for usage key ${usageKey}`
    );

  return await response.json();
};

export const getWikipediaImage = async (
  scientificName: string
): Promise<string> => {
  const formattedName = scientificName.replace(" ", "-");

  const response = await fetch(gbifGetSlugs.wikipedia(formattedName));

  const data = await response.json();

  // Extract image URL from the API response
  const pages = data.query.pages;
  const pageId = Object.keys(pages)[0];
  const imageUrl = pages[pageId].thumbnail
    ? pages[pageId].thumbnail.source
    : null;

  return imageUrl;
};
