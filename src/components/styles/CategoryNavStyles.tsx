import styled from "styled-components";

export const CategoryNavStyles = styled.nav<{ $editorActive?: boolean, $clickedNote: string }>`
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
  .categoryNavDropdown {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: fit-content;
    position: relative;
    margin-left: 1rem;
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