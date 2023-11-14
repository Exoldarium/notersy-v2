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
  transition: all 0.2s ease-out;
  position: relative;
  &:hover {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
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

export const NoCategoriesStyles = styled.div`
    width: 350px;
    padding-top: 10rem;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    button {
      border-radius: 5px;
      background: none;
      cursor: pointer;
    }
`;

export const CategorySortingStyles = styled.div`
  display: flex;
  flex-direction: row;
  p {
    font-size: 13px;
    margin: 0.4rem 0 0 0.4rem;
    align-self: center;
    cursor: default;
  }
  button {
    margin-top: 0.5rem;
    margin-left: 0.2rem;
    padding: 0 0.2rem 0.2rem 0.2rem;
    text-align: center;
    background: none;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
  }
`;