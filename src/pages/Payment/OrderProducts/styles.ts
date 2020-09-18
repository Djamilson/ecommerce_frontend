import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 3rem;
  margin-top: 1rem;
`;
export const Content = styled.div`
  margin-top: 30px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      padding: 12px 20px;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;
      &:hover {
        background: ${shade(0.2, '#7159c1')};
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;
  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }
  tbody td {
    padding: 5px;
    border-bottom: 1px solid #eee;
    color: #999;
  }
  tbody > tr > :nth-child(3) {
    text-align: center;
  }
  tbody > tr > :nth-child(4) {
    text-align: center;
  }
  tbody > tr > :nth-child(5) {
    text-align: center;
  }

  img {
    height: 80px;
  }
  strong {
    color: #333;
    display: block;
  }
  span {
    color: #333;
    display: block;
    margin-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const TransactionsTable = styled.table`
  width: 100%;
  thead th {
    color: #999;
    text-align: left;
    padding: 12px;
  }
  tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    color: #999;
  }
  tbody > tr > :nth-child(6) {
    text-align: center;
  }
  tbody > tr > :nth-child(4) {
    text-align: center;
  }
  tbody > tr > :nth-child(5) {
    text-align: center;
  }

  thead > tr > :nth-child(4) {
    text-align: center;
  }

  thead > tr > :nth-child(5) {
    text-align: center;
  }
  thead > tr > :nth-child(6) {
    text-align: center;
  }
`;

export const Total = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  section {
    flex: 1;
    align-items: baseline;
    flex-direction: row;
    span {
      color: #999;
      font-weight: bold;
    }
    strong {
      font-size: 18px;
      margin-left: 5px;
      color: #3b3a3a;

      text-align: right;
    }
  }

  div {
    display: flex;
    align-items: baseline;
    flex-direction: row;
    span {
      color: #999;
      font-weight: bold;
      padding-left: 10px;
    }
    strong {
      font-size: 16px;
      margin-left: 5px;
      color: #3b3a3a;
    }
  }
`;
