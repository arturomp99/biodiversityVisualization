export const gbifSpeciesAPIUrl = "https://api.gbif.org/v1";
export const gbifGetSlugs = {
  nameMatch: (scientificName: string) =>
    `/species/match?name=${scientificName}`,

  vernacularName: (
    usageKey: number,
    limitOffset: { limit: number; offset: number } = { limit: 1, offset: 0 }
  ) =>
    `/species/${usageKey}/vernacularNames` +
    `?limit=${limitOffset?.limit}&offset=${limitOffset?.offset}`,

  description: (
    usageKey: number,
    limitOffset: { limit: number; offset: number } = { limit: 1, offset: 0 }
  ) =>
    `/species/${usageKey}/descriptions` +
    `?limit=${limitOffset?.limit}&offset=${limitOffset?.offset}`,
};

export const vernacularNamesQuery = {
  limit: 10,
  offset: 0,
};
