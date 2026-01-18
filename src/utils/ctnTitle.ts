export const ctnTitle = (prefix: string, hashtag: string) => {
  const parts = [prefix, hashtag].filter((p) => p.length > 0);
  return parts.join(" ");
};
