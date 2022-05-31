import React, { useState } from "react";
import styled from "styled-components";
import { darkGreen } from "./helpers/colors";

const StyledHeading = styled.h2`
  color: ${darkGreen};
`;

type HeadingProps = {
  text: string;
};
function Heading({ text }: HeadingProps) {
  return <StyledHeading>{text}</StyledHeading>;
}

export default Heading;
