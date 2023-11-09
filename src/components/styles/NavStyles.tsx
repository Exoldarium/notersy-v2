import styled from 'styled-components';

export const NavStyles = styled.nav`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  margin: 0.2rem 0 0.2rem 0.2rem;
  border-bottom: 1px solid black;
  div {
    flex: 1;
  }
  .navDropdown {
    display: flex;
    flex-direction: column;
    width: 5rem;
    height: 2rem;
    button {
      width: 5rem;
    }
  }
`;