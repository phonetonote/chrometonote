import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MyStyledButton from "./MyStyledButton";

describe("MyStyledButton", () => {
  it("renders with the correct text", () => {
    render(<MyStyledButton buttonText="Click me" clickEvent={() => {}} />);
    expect(screen.getByText("Click me")).toBeDefined();
  });

  it("calls clickEvent when clicked", () => {
    const handleClick = vi.fn();
    render(<MyStyledButton buttonText="Click me" clickEvent={handleClick} />);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when isDisabled is true", () => {
    render(
      <MyStyledButton
        buttonText="Disabled"
        clickEvent={() => {}}
        isDisabled={true}
      />
    );

    const button = screen.getByText("Disabled");
    expect(button).toHaveProperty("disabled", true);
  });

  it("is not disabled by default", () => {
    render(<MyStyledButton buttonText="Enabled" clickEvent={() => {}} />);

    const button = screen.getByText("Enabled");
    expect(button).toHaveProperty("disabled", false);
  });
});
