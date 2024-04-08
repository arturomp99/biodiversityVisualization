export const gbifGetSlugs = {
  wikipedia: (scientificName: string) =>
    `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${scientificName}&pithumbsize=500`,
};
