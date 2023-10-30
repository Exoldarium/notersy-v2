import styled from 'styled-components';

export const CategoryStyles = styled.li`
  border: 1px solid black;
  height: 90px;
  width: 350px;
  margin: 0.2rem 0 0.2rem 0.2rem;
  cursor: pointer;
  form {
   position: relative;
   height: 1rem;
   width: 100%;
  }
  form:hover > input {
    display: 'block';
  }
  input {
    cursor: pointer;
    display: none;
    float: right;
  }
  input:checked {
    display: block;
  }
`;