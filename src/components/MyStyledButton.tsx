import React, { useState } from "react";
import styled from "styled-components";
import { darkGreen, lightGreen, mediumGreen, white } from "./helpers/colors";

const StyledButton = styled.button`
  background-color: ${darkGreen};
  width: 200px;
  height: 50px;
  font-size: 16px;
  border: none;
  color: ${white};
  border-radius: 8px;
  margin: 6px 0;
  cursor: pointer;

  &:hover {
    background-color: ${mediumGreen};
  }

  &:disabled,
  &[disabled] {
    background-color: ${lightGreen};
    cursor: default;
  }
`;

type MyStyledButtonProps = {
  clickEvent: () => void;
  isDisabled?: boolean;
  buttonText: string;
};
function MyStyledButton({
  clickEvent,
  isDisabled = false,
  buttonText,
}: MyStyledButtonProps) {
  return (
    <StyledButton onClick={() => clickEvent()} disabled={isDisabled}>
      {buttonText}
    </StyledButton>
  );
}

export default MyStyledButton;
