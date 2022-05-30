import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./components/Button";

const Popup = () => {
  const [ptnKey, setPtnKey] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get({ ptnKey: null }, (items) => {
      setPtnKey(items.ptnKey);
    });
  }, []);

  return (
    <>
      <Button buttonType="activeTab" ptnKey={ptnKey} />
      <Button buttonType="currentWindow" ptnKey={ptnKey} />
      <Button buttonType="allWindows" ptnKey={ptnKey} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
