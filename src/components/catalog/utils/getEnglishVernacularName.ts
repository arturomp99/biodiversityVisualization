import { getVernacularNames } from "../requests/requests";

export const getEnglishVernacularName = (
  names: Awaited<ReturnType<typeof getVernacularNames>>["results"]
) => {
  for (const name of names) {
    if (name.language === "eng") return name.vernacularName;
  }
  return "";
};
