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
      width: 35%;
      height: 2.8rem;
      background: ${colors.colorSecundary};
      color: ${colors.colorButtonText};
      border: 0;
      border-radius: 0.6rem;

      font: 700 1rem Archivo;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.2s;

      span {
        display: block;
        background: rgba(0, 0, 0, 0.08);
        width: 52px;
        height: 2.8rem;
        border-radius: 0.6rem 0 0 0.6rem;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
        svg {
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
    }

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      line-height: 1.6rem;
      color: ${colors.colorTextcomplement};

      img {
        margin-right: 1rem;
      }
    }
  }
`;
