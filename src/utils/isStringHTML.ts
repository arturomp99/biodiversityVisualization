export const isStringHTML = (string: string) => {
  const regexPattern = /<([a-z][a-z0-9]*)(\s[^>]*)?>.*?<\/\1>/is;
  return regexPattern.test(string);
};
