import styled from "styled-components";
import { Checked } from "../../types";

export const CategoryNavStyles = styled.nav<{ $checkbox: Checked[], $editTitle: boolean }>`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  margin: 0.2rem 0 0.2rem 0.2rem;
  height: 3rem;
  border-bottom: 1px solid black;
  position: relative;
  z-index: 1;
  align-items: center;
  .tooltiptext {
    visibility: hidden;
    width: fit-content;
    max-width: 350px;
    font-size: 12px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 0.2rem;
    position: absolute;
    top: 40px;
    z-index: 2;
    opacity: 0.9;
    right: 0;
  }
  .title-edit {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 4.5rem;
    h1 {
      display: flex;
      width: 100px;
      cursor: pointer;
      white-space: nowrap;
      p {
        padding: 0.2rem 0.2rem 0.4rem 0.2rem; 
      }
      &:hover > .tooltiptext{
        left: 0;
        visibility: visible;
        transition-delay: 500ms;
      }
      p:hover {
        border-radius: 5px;
        background-color: #dbd8d8;
      }
    }
    form {
      display: flex;
      flex-direction: row;
      align-items: center;
      input {
        border-radius: 5px;
      }
      .confirm-edit-button {
        background: none;
        border: none;
        width: fit-content;
        height: fit-content;
        padding: 0;
        cursor: pointer;
        svg {
          width: 1.2rem;
          height: 1.2rem;
          transition: all 0.2s ease-out;
      }
      }
    }
    .back-button {
      display: flex;
      justify-self: flex-start;
      background: none;
      border: none;
      width: fit-content;
      height: fit-content;
      padding-right: 0.5rem;
      margin: 0;
      cursor: pointer;
      svg {
        width: 1.4rem;
        height: 1.4rem;
        transition: all 0.2s ease-out;
        flex: 1
      }
      &:hover > .tooltiptext{
        left: 0;
        visibility: visible;
        transition-delay: 500ms;
      }
    }
    .editTitle-button {
      background: none;
      padding: 0;
      border: none;
      width: fit-content;
      height: fit-content;
      position: relative;
      margin: 0;
      cursor: pointer;
      svg {
        width: 1rem;
        height: 1rem;
        transition: all 0.2s ease-out;
      }
      &:hover > .tooltiptext{
        visibility: visible;
        transition-delay: 500ms;
      }
      svg:hover {
        width: ${props => !props.$editTitle && "1.4rem"};
        height: ${props => !props.$editTitle && "1.4rem"};
      }
    }
  }
  .trash-button-div {
    display: ${props => (props.$checkbox.length !== 0 && !props.$editTitle) ? 'flex' : 'none'};
    flex-direction: row;
    align-items: center;
    justify-self: flex-end;
    p {
      cursor: default;
      white-space: nowrap;
      font-size: 12px;
    }
    button {
      margin-left: 0.2rem;
      width: fit-content;
      height: fit-content;
      background: none;
      border: none;
      position: relative;
      padding: 0;
      cursor: pointer;
      svg {
        width: 1.4rem;
        height: 1.4rem;
        transition: all 0.2s ease-out;
      }
      .tooltiptext {
        visibility: hidden;
        width: fit-content;
        max-width: 350px;
        font-size: 12px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 0.2rem;
        position: absolute;
        top: 30px;
        z-index: 2;
        opacity: 0.9;
        right: 0;
      }
      &:hover > .tooltiptext {
        visibility: visible;
        transition-delay: 500ms;
      }
      svg:hover {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
  .newNote-button-div {
    display: flex;
    justify-content: flex-end;
    flex: 1 0 0;
    button {
      width: fit-content;
      height: fit-content;
      border-radius: 5px;
      border: none;
      position: relative;
      padding: 0;
      margin: 0;
      cursor: pointer;
      svg {
        width: 1.4rem;
        height: 1.4rem;
        transition: all 0.2s ease-out;
      }
      .tooltiptext {
        visibility: hidden;
        width: fit-content;
        font-size: 12px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 0.2rem;
        position: absolute;
        top: 30px;
        z-index: 2;
        opacity: 0.9;
        right: 0;
      }
      &:hover > .tooltiptext {
        visibility: visible;
        transition-delay: 500ms;
      }
      svg:hover {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
  }
  .categoryNavDropdown {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: fit-content;
    position: relative;
    margin-left: 0.7rem;
    padding-right: 0.2rem;
    .dropdown-menu {
      display: flex;
      flex-direction: column;
      z-index: 1; 
      position: absolute;
      right: 10px;
      top: 40px;
      width: 250px;
      height: fit-content;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.4);
      border-radius: 5px;
      overflow: hidden
    }
    .dropDownButton {
      text-align: left;
      height: inherit;
      border: none;
      padding: 0.4rem 0.4rem 0.4rem 0.4rem;
      background-color: whitesmoke;
      cursor: pointer;
    }
    .dropDownButton:hover {
      background-color: #dbd8d8;
    }
    a {
      text-align: left;
      height: inherit;
      text-decoration: none;
      color: black;
      font-size: 14px;
      cursor: pointer;
      padding: 0.4rem 0.4rem 0.4rem 0.4rem;
      background-color: whitesmoke;
    }
    a:hover {
      background-color: #dbd8d8;
    }
  }
`;