import React, { useState } from "react";
import { ctnTitle } from "../utils/ctnTitle";
import { getSettings } from "../utils/storageDefaults";
import { tabOrBookmarkToMarkdown } from "../utils/tabOrBookmarkToMarkdown";
import Heading from "./Heading";
import MyStyledButton from "./MyStyledButton";
import SyncButton from "./SyncButton";

type Folder = {
  title: string;
  id: string;
};

const foldersFromBookmarks = (
  bookmarks: any[],
  folders: Folder[]
): Folder[] => {
  bookmarks.forEach((bookmark) => {
    if (bookmark.title.length > 0 && !bookmark.url) {
      folders.push({ title: bookmark.title, id: bookmark.id });
    }

    if (bookmark.children) {
      folders = folders.concat(foldersFromBookmarks(bookmark.children, []));
    }
  });
  return folders;
};

function BookmarkButton() {
  const fetchFolders = async () => {
    const bookmarks = await chrome.bookmarks.getTree();
    const folders = foldersFromBookmarks(bookmarks, []);

    setFolders(folders);
  };

  const [folders, setFolders] = useState<Folder[]>([]);

  const getBody = async (folder: Folder) => {
    const settings = await getSettings();
    const bookmarks = await chrome.bookmarks.getChildren(folder.id);
    const attachments = bookmarks.map((bookmark) =>
      tabOrBookmarkToMarkdown(bookmark)
    );
    const hashtag = settings.bookmarkHashtag
      ? `${settings.bookmarkHashtag} — ${folder.title}`
      : folder.title;
    return {
      body: ctnTitle(settings.prefixText, hashtag),
      attachments,
    };
  };

  const folderButtons = folders.map((folder) => (
    <SyncButton
      buttonText={`${folder.title}`}
      key={folder.id}
      bodyFunc={() => getBody(folder)}
    />
  ));

  return folders.length === 0 ? (
    <MyStyledButton buttonText="bookmarks" clickEvent={() => fetchFolders()} />
  ) : (
    <>
      <Heading text="select a folder to sync:" />
      {folderButtons}
    </>
  );
}

export default BookmarkButton;
