import React from "react";
import { ctnTitle } from "../utils/ctnTitle";
import { getSettings, StorageSettings } from "../utils/storageDefaults";
import { tabOrBookmarkToMarkdown } from "../utils/tabOrBookmarkToMarkdown";
import SyncButton from "./SyncButton";

export type TabButtonType = "currentWindow" | "activeTab" | "allWindows";

const buttonTypeToTabQuery: { [key in TabButtonType]: chrome.tabs.QueryInfo } =
  {
    currentWindow: { currentWindow: true },
    activeTab: { highlighted: true, currentWindow: true },
    allWindows: {},
  };

const buttonTypeToHashtagKey: {
  [key in TabButtonType]: keyof StorageSettings;
} = {
  currentWindow: "currentWindowHashtag",
  activeTab: "activeTabHashtag",
  allWindows: "allWindowsHashtag",
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
    const settings = await getSettings();
    const hashtag = settings[buttonTypeToHashtagKey[tabButtonType]] as string;
    return {
      body: ctnTitle(settings.prefixText, hashtag),
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
