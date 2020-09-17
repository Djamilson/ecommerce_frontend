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

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;
