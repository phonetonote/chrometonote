import { describe, it, expect } from "vitest";
import { tabOrBookmarkToMarkdown } from "./tabOrBookmarkToMarkdown";

describe("tabOrBookmarkToMarkdown", () => {
  it("converts a tab with title and url to markdown link", () => {
    const tab = {
      title: "Google",
      url: "https://google.com",
    } as chrome.tabs.Tab;

    expect(tabOrBookmarkToMarkdown(tab)).toBe("[Google](https://google.com)");
  });

  it("returns just the url when title is empty", () => {
    const tab = {
      title: "",
      url: "https://google.com",
    } as chrome.tabs.Tab;

    expect(tabOrBookmarkToMarkdown(tab)).toBe("https://google.com");
  });

  it("returns just the url when title is missing", () => {
    const tab = {
      url: "https://google.com",
    } as chrome.tabs.Tab;

    expect(tabOrBookmarkToMarkdown(tab)).toBe("https://google.com");
  });

  it("handles bookmark nodes the same as tabs", () => {
    const bookmark = {
      id: "1",
      title: "My Bookmark",
      url: "https://example.com",
    } as chrome.bookmarks.BookmarkTreeNode;

    expect(tabOrBookmarkToMarkdown(bookmark)).toBe(
      "[My Bookmark](https://example.com)"
    );
  });

  it("escapes special characters in markdown", () => {
    const tab = {
      title: "Test [with] brackets",
      url: "https://example.com/path?query=1",
    } as chrome.tabs.Tab;

    expect(tabOrBookmarkToMarkdown(tab)).toBe(
      "[Test [with] brackets](https://example.com/path?query=1)"
    );
  });
});
