export const tabToMarkdown = (tab: chrome.tabs.Tab) => {
  const { title, url } = tab;
  if (title && url && title.length > 0 && url.length > 0) {
    return `[${title}](${url})`;
  } else {
    return `${url}`;
  }
};
