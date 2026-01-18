// Storage keys and their default values
export const storageDefaults = {
  ptnKey: "",
  prefixText: "#chrometonote",
  activeTabHashtag: "[[ptn active tab sync]]",
  currentWindowHashtag: "[[ptn current window sync]]",
  allWindowsHashtag: "[[ptn all windows sync]]",
  bookmarkHashtag: "[[ptn bookmark sync]]",
};

export type StorageSettings = typeof storageDefaults;

export const getSettings = (): Promise<StorageSettings> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(storageDefaults, (items) => {
      resolve(items as StorageSettings);
    });
  });
};
