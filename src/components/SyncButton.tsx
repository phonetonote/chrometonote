import React, { useEffect, useState } from "react";
import MyStyledButton from "./MyStyledButton";

const APP_URL = "https://app.phonetonote.com";

type SyncStatus = "ready" | "syncing" | "complete";
type SyncButtonProps = {
  buttonText: string;
  bodyFunc: () => Promise<{ body: string; attachments: string[] }>;
};
function SyncButton({ buttonText, bodyFunc }: SyncButtonProps) {
  const [ptnKey, setPtnKey] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get({ ptnKey: null }, (items) => {
      setPtnKey(items.ptnKey);
    });
  }, []);

  const sendNotes = async () => {
    setSyncStatus("syncing");

    const bodyFromProps = await bodyFunc();

    // send a POST to app.phonetonote using fetch
    const response = await fetch(`${APP_URL}/hooks/chrome/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...bodyFromProps,
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
    <MyStyledButton
      clickEvent={() => sendNotes()}
      isDisabled={syncStatus !== "ready"}
      buttonText={
        (syncStatus === "ready" && buttonText) ||
        (syncStatus === "syncing" && "⚡️ syncing...") ||
        (syncStatus === "complete" && "✅ sync complete") ||
        ""
      }
    />
  );
}

export default SyncButton;
