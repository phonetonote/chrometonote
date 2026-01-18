import { describe, it, expect, vi, beforeEach } from "vitest";
import { storageDefaults, getSettings } from "./storageDefaults";

describe("storageDefaults", () => {
  it("has all expected keys", () => {
    expect(storageDefaults).toHaveProperty("ptnKey");
    expect(storageDefaults).toHaveProperty("prefixText");
    expect(storageDefaults).toHaveProperty("activeTabHashtag");
    expect(storageDefaults).toHaveProperty("currentWindowHashtag");
    expect(storageDefaults).toHaveProperty("allWindowsHashtag");
    expect(storageDefaults).toHaveProperty("bookmarkHashtag");
  });

  it("has correct default values", () => {
    expect(storageDefaults.prefixText).toBe("#chrometonote");
    expect(storageDefaults.activeTabHashtag).toBe("[[ptn active tab sync]]");
    expect(storageDefaults.currentWindowHashtag).toBe("[[ptn current window sync]]");
    expect(storageDefaults.allWindowsHashtag).toBe("[[ptn all windows sync]]");
    expect(storageDefaults.bookmarkHashtag).toBe("[[ptn bookmark sync]]");
  });
});

describe("getSettings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns settings from chrome storage", async () => {
    const settings = await getSettings();
    expect(settings.prefixText).toBe("#chrometonote");
    expect(settings.ptnKey).toBe("test-key");
  });
});
