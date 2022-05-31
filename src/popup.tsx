import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import BookmarkButton from "./components/BookmarkButton";
import Button from "./components/SyncButton";
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

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
