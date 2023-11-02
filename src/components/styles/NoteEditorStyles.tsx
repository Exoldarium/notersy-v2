import styled from 'styled-components';

export const EditorStyles = styled.div<{ $editorActive?: boolean }>`
  .editorButtons{ 
    display: ${props => props.$editorActive ? 'flex' : 'none'};
    border-bottom: 1px solid black;
    button {
      width: 2.5rem;
      height: 3rem;
      flex: 1;
    }
    .is-active {
      background-color: peachpuff;
    }
  }
  .tiptap {
    min-height: 100px;
    height: fit-content;
    padding: 0.2rem;
    border: 1px solid black;
    border-radius: 3px;
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
  border-radius: 3px;
  cursor: ${props => !props.$editable && 'pointer'};
  margin: 0.5rem 0 0.5rem 0;
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
    border-bottom: 1px solid black;
    button {
      width: 2.5rem;
      height: 3rem;
      flex: 1;
    }
    .is-active {
      background-color: peachpuff;
    }
  }
  .tiptap {
    min-height: 100px;
    height: fit-content;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    p {
      margin: 0;
    }
    h1, h2, h3 {
      margin: 0;
    }
  }
`;