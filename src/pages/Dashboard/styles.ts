import styled from 'styled-components';

export const Container = styled.div``;

export const ProductList = styled.ul`
  margin-top: 30px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;
`;
