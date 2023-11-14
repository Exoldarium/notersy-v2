import styled from "styled-components";
import { Checked } from "../../types";

export const CategoryNavStyles = styled.nav<{
  $editorActive?: boolean,
  $clickedNote: string,
  $checkbox: Checked[],
  $editTitle: boolean
}>`
  /* display: ${props => props.$editorActive || props.$clickedNote ? 'none' : 'flex'}; */
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
    flex: ${props => props.$checkbox.length !== 0 ? '' : '1 0 0'};
    h1 {
      /* flex: 1 0 0; */
      margin: 0;
      padding-bottom: 0.2rem;
      cursor: pointer;
      white-space: nowrap;
      &:hover > .tooltiptext{
        left: 0;
        visibility: visible;
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
        /* flex: 1 0 0; */
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
      /* flex: 1 0 0; */
      background: none;
      border: none;
      width: fit-content;
      height: fit-content;
      padding: 0;
      margin: 0;
      cursor: pointer;
      svg {
        width: 1.4rem;
        height: 1.4rem;
        transition: all 0.2s ease-out;
      }
      &:hover > .tooltiptext{
        left: 0;
        visibility: visible;
      }
      svg:hover {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
    .editTitle-button {
      /* flex: 1 0 0; */
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
    flex: 1 0 0;
    padding-left: 4rem;
    p {
      cursor: default;
      white-space: nowrap;
      font-size: 12px;
    }
    button {
      margin-left: 0.7rem;
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
        padding: 2px 0;
        position: absolute;
        top: 30px;
        z-index: 2;
        opacity: 0.9;
        right: 0;
      }
      &:hover > .tooltiptext {
        visibility: visible;
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
    flex: ${props => props.$checkbox.length !== 0 ? '1 0 0' : ''};
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
        width: 100px;
        font-size: 12px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 2px 0;
        position: absolute;
        top: 30px;
        z-index: 2;
        opacity: 0.9;
        right: 0;
      }
      &:hover > .tooltiptext {
        visibility: visible;
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