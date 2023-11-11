import styled from 'styled-components';
import { Checked } from '../../types';

export const NavStyles = styled.nav<{ $checkbox?: Checked[] }>`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  margin: 0.2rem 0 0.2rem 0.2rem;
  border-bottom: 1px solid black;
  .headerDiv {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 0 0;
    h1 {
      margin: 0 4rem 0 0;
    }
    p {
      width: fit-content;
      margin: 0;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      font-size: 12px;
    }
  }
  .navButtons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    flex: 1 0 0;
    button {
      flex: ${props => props.$checkbox?.length !== 0 ? '1 0 0' : ''};
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
    flex-direction: row;
    flex: 1 0 0;
    align-items: center;
    button {
      height: 2rem;
      width: 5rem;
    }
  }
`;