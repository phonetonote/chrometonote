import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { storageDefaults, StorageSettings } from "./utils/storageDefaults";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px",
  marginTop: "4px",
  marginBottom: "16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "14px",
  color: "#333",
};

const sectionStyle: React.CSSProperties = {
  marginBottom: "24px",
};

const Options = () => {
  const [settings, setSettings] = useState<StorageSettings | null>(null);
  const [status, setStatus] = useState<string>("");
  const saveTimeoutRef = useRef<number | null>(null);
  const statusTimeoutRef = useRef<number | null>(null);

  // Load settings on mount
  useEffect(() => {
    chrome.storage.sync.get(storageDefaults, (items) => {
      setSettings(items as StorageSettings);
    });
  }, []);

  // Auto-save when settings change (debounced)
  useEffect(() => {
    if (settings === null) return; // Skip initial load

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = window.setTimeout(() => {
      chrome.storage.sync.set(settings, () => {
        setStatus("Saved");
        if (statusTimeoutRef.current) {
          clearTimeout(statusTimeoutRef.current);
        }
        statusTimeoutRef.current = window.setTimeout(() => {
          setStatus("");
        }, 1500);
      });
    }, 300);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [settings]);

  const updateSetting = <K extends keyof StorageSettings>(
    key: K,
    value: StorageSettings[K]
  ) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  if (settings === null) {
    return null; // Loading
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "20px", margin: 0, color: "#174e46" }}>
          ChromeToNote Settings
        </h1>
        {status && (
          <span
            style={{
              marginLeft: "12px",
              color: "#417668",
              fontSize: "13px",
              opacity: 0.8,
            }}
          >
            ✓ {status}
          </span>
        )}
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>PTN Key</label>
        <input
          style={inputStyle}
          value={settings.ptnKey}
          onChange={(e) => updateSetting("ptnKey", e.target.value)}
          type="text"
          placeholder="Your phonetonote API key"
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Prefix Text</label>
        <input
          style={inputStyle}
          value={settings.prefixText}
          onChange={(e) => updateSetting("prefixText", e.target.value)}
          type="text"
          placeholder="Text added before hashtags (leave empty to disable)"
        />
        <small style={{ color: "#666" }}>
          Added before each sync. Leave empty to disable.
        </small>
      </div>

      <h2 style={{ fontSize: "16px", marginBottom: "16px", color: "#174e46" }}>
        Hashtags
      </h2>

      <div style={sectionStyle}>
        <label style={labelStyle}>Current Tab</label>
        <input
          style={inputStyle}
          value={settings.activeTabHashtag}
          onChange={(e) => updateSetting("activeTabHashtag", e.target.value)}
          type="text"
          placeholder="e.g. [[ptn active tab sync]]"
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Current Window Tabs</label>
        <input
          style={inputStyle}
          value={settings.currentWindowHashtag}
          onChange={(e) => updateSetting("currentWindowHashtag", e.target.value)}
          type="text"
          placeholder="e.g. [[ptn current window sync]]"
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>All Tabs</label>
        <input
          style={inputStyle}
          value={settings.allWindowsHashtag}
          onChange={(e) => updateSetting("allWindowsHashtag", e.target.value)}
          type="text"
          placeholder="e.g. [[ptn all windows sync]]"
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Bookmarks</label>
        <input
          style={inputStyle}
          value={settings.bookmarkHashtag}
          onChange={(e) => updateSetting("bookmarkHashtag", e.target.value)}
          type="text"
          placeholder="e.g. [[ptn bookmark sync]]"
        />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
