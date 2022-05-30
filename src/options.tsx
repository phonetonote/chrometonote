import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Options = () => {
  const [ptnKey, setPtnKey] = useState<string>("");
  const [status, setStatus] = useState<string>("");

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

  const saveOptions = () => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        ptnKey: ptnKey,
      },
      () => {
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };

  return (
    <>
      <div>
        ptn key{" "}
        <input
          value={ptnKey}
          onChange={(event) => setPtnKey(event.target.value)}
          type="password"
          width={100}
        />
      </div>
      <div>{status}</div>
      <button onClick={saveOptions}>Save</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
