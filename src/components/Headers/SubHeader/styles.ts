import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../styles';

export const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;

  header {
    background: ${colors.colorBoxFooter};
    border-bottom: 1px solid ${colors.colorLineInWhite};

    @media (min-width: 700px) {
      padding: 4rem 6.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    p {
      @media (min-width: 700px) {
        justify-content: space-between;
      }
    }

    a {
      width: 100%;
      height: 4.3rem;
      background: ${colors.colorSecundary};
      color: ${colors.colorButtonText};
      border: 0;
      border-radius: 0.8rem;

      font: 700 1.3rem Archivo;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.2s;
      margin-top: 2.2rem;

      span {
        display: block;
        background: rgba(0, 0, 0, 0.08);
        width: 72px;
        height: 4.3rem;
        border-radius: 0.8rem 0 0 0.8rem;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
        span svg {
          color: #fff;
          width: 20px;
          height: 20px;
        }
      }

      strong {
        flex: 1;
        text-align: center;
        color: #fff;
      }

      &:hover {
        background: ${shade(0.2, `${colors.colorSecundary}`)};
      }

      @media (min-width: 700px) {
        width: 20rem;
        margin-top: 0;
      }
    }

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      line-height: 0.2rem;
      color: ${colors.colorTextcomplement};
    }
  }
`;
