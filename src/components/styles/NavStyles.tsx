import styled from 'styled-components';

export const NavStyles = styled.nav`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  margin: 0.2rem 0 0.2rem 0.2rem;
  border-bottom: 1px solid black;
  .headerDiv {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    flex: 1;
    h1 {
      margin-right: 4rem;
    }
    p {
      margin: 0;
      align-self: center;
      text-align: center;
      font-size: 12px;
    }
  }
  .navButtons {
    display: flex;
    flex: 1;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: center;
    button {
      width: fit-content;
      height: fit-content;
      background: none;
      border: none;
      position: relative;
      padding: 0;
      margin: 0.2rem;
      cursor: pointer;
      svg {
        width: 1.4rem;
        height: 1.4rem;
      }
      .tooltiptext {
        visibility: hidden;
        width: 100px;
        font-size: 12px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 2px 0;
        position: absolute;
        top: 30px;
        left: 20px;
        z-index: 1;
        opacity: 0.9;
      }
      &:hover > .tooltiptext{
        visibility: visible;
      }
      svg:hover {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
  .navDropdown {
    display: flex;
    flex-direction: column;
    width: 5rem;
    height: 2rem;
    button {
      width: 5rem;
    }
  }
`;