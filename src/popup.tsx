import React from "react";
import { createRoot } from "react-dom/client";
import BookmarkButton from "./components/BookmarkButton";
import TabButton from "./components/TabButton";

const Popup = () => {
  return (
    <>
      <TabButton tabButtonType="activeTab" />
      <TabButton tabButtonType="currentWindow" />
      <TabButton tabButtonType="allWindows" />
      <BookmarkButton />
    </>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
