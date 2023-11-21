import styled from 'styled-components';

export const EditorStyles = styled.div<{ $editorActive?: boolean }>`
  margin: 0.5rem 0 0.5rem 0;
  border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  font-size: 14px;
  .editorButtons{ 
    display: ${props => props.$editorActive ? 'flex' : 'none'};
    button {
      border: none;
      cursor: pointer;
      width: fit-content;
      height: fit-content;
      flex: 1;
      padding: 0.3rem;
    }
    .is-active {
      background-color: #0909092c;
    }
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
  .tiptap {
    min-height: 100px;
    height: fit-content;
    padding: 0.2rem;
    border: none;
    p {
      margin: 0;
    }
    h1, h2, h3 {
      margin: 0;
    }
  }
`;

export const NoteEditorStyles = styled.li<{ $editable?: boolean }>`
  border: 1px solid black;
  border-radius: 5px;
  cursor: ${props => !props.$editable && 'pointer'};
  margin: 0.5rem 0 0.5rem 0;
  overflow: hidden;
  transition: all 0.2s ease-out;
  font-size: 14px;
  &:hover {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  }
  form {
   display: ${props => props.$editable ? 'none' : 'block'};
   position: relative;
   height: 1rem;
   width: 100%;
  }
  form:hover > input {
    display: ${props => props.$editable ? 'none' : 'block'};
  }
  input {
    cursor: pointer;
    display: none;
    float: right;
    height: 1rem;
    width: 1rem;
  }
  input:checked {
    display: block;
  }
  .noteEditorButtons{ 
    display: ${props => props.$editable ? 'flex' : 'none'};
    button {
      border: none;
      cursor: pointer;
      width: fit-content;
      height: fit-content;
      flex: 1;
      padding: 0.3rem;
    }
    .is-active {
      background-color: #0909092c;
    }
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
  .tiptap {
    min-height: 100px;
    height: fit-content;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    border: none;
    p {
      margin: 0;
    }
    h1, h2, h3 {
      margin: 0;
    }
  }
`;