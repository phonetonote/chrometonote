import React from "react";
import { ctnTitle } from "../utils/ctnTitle";
import { tabOrBookmarkToMarkdown } from "../utils/tabOrBookmarkToMarkdown";
import SyncButton from "./SyncButton";

type TabButtonType = "currentWindow" | "activeTab" | "allWindows";

const buttonTypeToTabQuery: { [key in TabButtonType]: chrome.tabs.QueryInfo } =
  {
    currentWindow: { currentWindow: true },
    activeTab: { highlighted: true, currentWindow: true },
    allWindows: {},
  };

const buttonTypeToHashtag: { [key in TabButtonType]: string } = {
  currentWindow: "[[ptn current window sync]]",
  activeTab: "[[ptn active tab sync]]",
  allWindows: "[[ptn all windows sync]]",
};

const buttonTypeToButtonText: { [key in TabButtonType]: string } = {
  currentWindow: "tabs in current window",
  activeTab: "current tab",
  allWindows: "all tabs",
};

const tabsToMarkdown = async (tabQuery: chrome.tabs.QueryInfo) => {
  const tabs = await chrome.tabs.query(tabQuery);
  return tabs
    .filter((tab) => tab["url"])
    .map((tab) => tabOrBookmarkToMarkdown(tab));
};

type TabButtonProps = {
  tabButtonType: TabButtonType;
};

function TabButton({ tabButtonType }: TabButtonProps) {
  const getSyncBody = async () => {
    return {
      body: ctnTitle(buttonTypeToHashtag[tabButtonType]),
      attachments: await tabsToMarkdown(buttonTypeToTabQuery[tabButtonType]),
    };
  };

  return (
    <SyncButton
      bodyFunc={getSyncBody}
      buttonText={buttonTypeToButtonText[tabButtonType]}
    />
  );
}

export default TabButton;
