import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 3rem;
  margin-top: 1rem;
`;

export const ProductList = styled.ul`
  margin-top: 30px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;
`;
