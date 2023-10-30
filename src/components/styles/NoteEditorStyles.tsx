import styled from 'styled-components';

export const EditorStyles = styled.div`
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

export const NoteEditorStyles = styled.li<{ editable?: boolean }>`
  border: 1px solid black;
  border-radius: 3px;
  cursor: ${props => !props.editable && 'pointer'};
  form {
   position: relative;
   height: 1rem;
   width: 100%;
  }
  form:hover > input {
    display: ${props => props.editable ? 'none' : 'block'};
  }
  input {
    cursor: pointer;
    display: none;
    float: right;
  }
  input:checked {
    display: block;
  }
  .tiptap {
    min-height: 100px;
    height: fit-content;
    /* padding: 1.5rem 0.2rem 0.2rem 0.2rem; */
    p {
      margin: 0;
    }
    h1, h2, h3 {
      margin: 0;
    }
  }
`;