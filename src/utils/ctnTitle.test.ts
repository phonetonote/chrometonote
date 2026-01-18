import { describe, it, expect } from "vitest";
import { ctnTitle } from "./ctnTitle";

describe("ctnTitle", () => {
  it("prepends #chrometonote to the hashtag", () => {
    expect(ctnTitle("[[test]]")).toBe("#chrometonote [[test]]");
  });

  it("handles empty string", () => {
    expect(ctnTitle("")).toBe("#chrometonote ");
  });

  it("handles complex hashtags", () => {
    expect(ctnTitle("[[ptn active tab sync]]")).toBe(
      "#chrometonote [[ptn active tab sync]]"
    );
  });
});
