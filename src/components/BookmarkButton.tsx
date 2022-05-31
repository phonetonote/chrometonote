import React, { useState } from "react";
import { ctnTitle } from "../utils/ctnTitle";
import { tabOrBookmarkToMarkdown } from "../utils/tabOrBookmarkToMarkdown";
import Heading from "./Heading";
import MyStyledButton from "./MyStyledButton";
import StyledButton from "./MyStyledButton";
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
    const bookmarks = await chrome.bookmarks.getChildren(folder.id);
    const attachments = bookmarks.map((bookmark) =>
      tabOrBookmarkToMarkdown(bookmark)
    );
    return {
      body: ctnTitle(`[[ptn bookmark sync]] — ${folder.title}`),
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
