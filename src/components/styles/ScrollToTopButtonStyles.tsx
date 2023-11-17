import styled from "styled-components";

export const ScrollToTopButtonStyles = styled.button`
  position: fixed;
  bottom: 50px;
  left: 300px;
  cursor: pointer;
  background: none;
  border: none;
  svg {
    width: 1.4rem;
    height: 1.4rem;
    transition: all 0.2s ease-out;
  }
  svg:hover {
    width: 1.6rem;
    height: 1.6rem;
  }
`;