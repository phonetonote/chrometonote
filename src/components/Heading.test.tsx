import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading", () => {
  it("renders the text content", () => {
    render(<Heading text="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeDefined();
  });

  it("renders as an h2 element", () => {
    render(<Heading text="Test Heading" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeDefined();
    expect(heading.textContent).toBe("Test Heading");
  });
});
