import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const tabToMarkdown = (tab: chrome.tabs.Tab) => {
  const { title, url } = tab;
  if (title && url && title.length > 0 && url.length > 0) {
    return `[${title}](${url})`;
  } else {
    return `${url}`;
  }
};

const Popup = () => {
  const [ptnKey, setPtnKey] = useState<string>("");
  const [syncStatus, setSyncStatus] = useState<number>(0);

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        ptnKey: null,
      },
      (items) => {
        setPtnKey(items.ptnKey);
      }
    );
  }, []);

  const sendNotes = async () => {
    setSyncStatus(1);
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const arrOfMarkdown = tabs
      .filter((tab) => tab["url"])
      .map((tab) => tabToMarkdown(tab));

    // send a POST to app.phonetonote using fetch
    const response = await fetch("https://app.phonetonote.com/hooks/chrome/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: "#chrometonote sync",
        attachments: arrOfMarkdown,
        ptn_key: ptnKey,
      }),
    });

    console.log("response", response);
    setSyncStatus(2);
  };

  return (
    <>
      <button
        title="send current tabs to phonetonote"
        style={{
          backgroundColor: "#2a7768",
          width: "200px",
          height: "50px",
          fontSize: "16px",
        }}
        onClick={sendNotes}
        disabled={syncStatus > 0}
      >
        {syncStatus === 0 && "⚡️ send tabs to notes"}
        {syncStatus === 1 && "⚡️ syncing..."}
        {syncStatus === 2 && "⚡️ sync complete"}
      </button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
