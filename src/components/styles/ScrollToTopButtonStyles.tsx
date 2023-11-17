import styled from "styled-components";

export const ScrollToTopButtonStyles = styled.button`
  position: fixed;
  bottom: 50px;
  left: 300px;
  cursor: pointer;
  background-color: #a5a4a4de;
  border: 1px solid black;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  border-radius: 5px;
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