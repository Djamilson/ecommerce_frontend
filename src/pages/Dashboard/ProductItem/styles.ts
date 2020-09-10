import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 1rem;

  img {
    align-self: center;
    max-width: 230px;
  }

  > strong {
    font-size: 15px;
    line-height: 20px;
    color: #333;
    margin-top: 5px;
  }

  > span {
    font-size: 18px;
    font-weight: bold;
    margin: 5px 0 20px;
    color: #333;
  }

  button {
    background: #7159c1;
    color: #fff;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    margin-top: auto;

    display: flex;
    align-items: center;
    transition: background 0.02s;

    &:hover {
      background: ${shade(0.2, '#7159c1')};
    }

    div {
      display: flex;
      align-items: center;
      padding: 12px;
      background: rgba(0, 0, 0, 0.1);

      svg {
        margin-right: 5px;
      }
    }

    span {
      font-size: 11px;
      flex: 1;
      text-align: center;
      font-weight: bold;
    }
  }
`;
