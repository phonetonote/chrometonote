import { describe, it, expect } from "vitest";
import { ctnTitle } from "./ctnTitle";

describe("ctnTitle", () => {
  it("combines prefix and hashtag with a space", () => {
    expect(ctnTitle("#chrometonote", "[[test]]")).toBe("#chrometonote [[test]]");
  });

  it("returns just the hashtag when prefix is empty", () => {
    expect(ctnTitle("", "[[test]]")).toBe("[[test]]");
  });

  it("returns just the prefix when hashtag is empty", () => {
    expect(ctnTitle("#chrometonote", "")).toBe("#chrometonote");
  });

  it("returns empty string when both are empty", () => {
    expect(ctnTitle("", "")).toBe("");
  });

  it("handles complex prefixes and hashtags", () => {
    expect(ctnTitle("my-prefix", "[[ptn active tab sync]]")).toBe(
      "my-prefix [[ptn active tab sync]]"
    );
  });
});
