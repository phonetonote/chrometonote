import React, { useState } from "react";
import styled from "styled-components";
import { tabToMarkdown } from "../utils/tabToMarkdown";

type ButtonType = "currentWindow" | "activeTab" | "allWindows";

type SyncStatus = "ready" | "syncing" | "complete";

type ButtonProps = {
  buttonType: ButtonType;
  ptnKey: string;
};

const buttonTypeToTabQuery: { [key in ButtonType]: chrome.tabs.QueryInfo } = {
  currentWindow: { currentWindow: true },
  activeTab: { highlighted: true, currentWindow: true },
  allWindows: {},
};

const buttonTypeToButtonText: { [key in ButtonType]: string } = {
  currentWindow: "tabs in current window",
  activeTab: "current tab",
  allWindows: "all tabs",
};

const StyledButton = styled.button`
  background-color: #174e46;
  width: 200px;
  height: 50px;
  fontsize: 16px;
  border: none;
  color: #eafee9;
  border-radius: 8px;
  margin: 6px 0;
  cursor: pointer;

  &:hover {
    background-color: #417668;
  }

  &:disabled,
  &[disabled] {
    background-color: #8baba2;
    cursor: default;
  }
`;

const APP_URL = "https://app.phonetonote.com";

function Button({ buttonType, ptnKey }: ButtonProps) {
  const sendNotes = async (tabQuery: chrome.tabs.QueryInfo) => {
    setSyncStatus("syncing");
    const tabs = await chrome.tabs.query(tabQuery);
    console.log("tabs", tabs);
    const arrOfMarkdown = tabs
      .filter((tab) => tab["url"])
      .map((tab) => tabToMarkdown(tab));

    // send a POST to app.phonetonote using fetch
    const response = await fetch(`${APP_URL}/hooks/chrome/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: "#chrometonote sync ;today;",
        attachments: arrOfMarkdown,
        ptn_key: ptnKey,
      }),
    });

    window.setTimeout(() => {
      setSyncStatus("complete");
      window.setTimeout(() => {
        setSyncStatus("ready");
      }, 250);
    }, 250);
  };

  const [syncStatus, setSyncStatus] = useState<SyncStatus>("ready");

  return (
    <StyledButton
      onClick={() => sendNotes(buttonTypeToTabQuery[buttonType])}
      disabled={syncStatus !== "ready"}
    >
      {syncStatus === "ready" && `${buttonTypeToButtonText[buttonType]}`}
      {syncStatus === "syncing" && "⚡️ syncing..."}
      {syncStatus === "complete" && "✅ sync complete"}
    </StyledButton>
  );
}

export default Button;
