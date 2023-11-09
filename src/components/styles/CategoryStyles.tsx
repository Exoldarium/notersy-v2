import styled from 'styled-components';

export const CategoryStyles = styled.li`
  border-radius: 5px;
  height: 90px;
  width: 350px;
  margin: 0.7rem 0 0.7rem 0.2rem;
  display: flex;
  flex-direction: column;
  background-color: #80808030;
  font-weight: bold;
  &:hover {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.5);
  }
  cursor: pointer;
  a {
    padding-left: 0.5rem;
    text-decoration: none;
    color: black;
  }
  div {
    flex: 1;
  }
  p {
    padding-left: 0.5rem;
    font-size: 12px;
    font-weight: normal;
  }
  form {
   position: relative;
   height: 1rem;
   width: 100%;
  }
  form:hover > input {
    display: block;
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
`;