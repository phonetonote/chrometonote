export const tabOrBookmarkToMarkdown = (
  tab: chrome.tabs.Tab | chrome.bookmarks.BookmarkTreeNode
) => {
  const { title, url } = tab;
  if (title && url && title.length > 0 && url.length > 0) {
    return `[${title}](${url})`;
  } else {
    return `${url}`;
  }
};
