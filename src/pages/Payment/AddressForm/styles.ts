import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  padding: 20px;

  @media (min-width: 700px) {
    max-width: 90vw;
  }
`;

export const Content = styled.div`
  max-width: 80vw;
  margin-top: 1rem;
`;

export const ContainerForm = styled.div`
  form {
    background: ${colors.colorBoxBase};
    width: 100%;
    max-width: 94rem;
    border-radius: 0.8rem;
    margin-top: 20px;
    padding-top: 0.4rem;
    overflow: hidden;

    header {
      background: ${colors.colorBoxFooter};
      border-bottom: 1px solid ${colors.colorLineInWhite};
      margin-top: -0.4rem;
      margin-bottom: 5rem;

      width: 80vw;
      margin-left: -6.4rem;

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

      button {
        width: 100%;
        height: 3.6rem;
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
        margin-top: 0rem;

        &:hover {
          background: ${colors.colorSecundaryDark};
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
        line-height: 1.4rem;
        color: ${colors.colorTextcomplement};

        img {
          margin-right: 1rem;
        }
      }
    }

    fieldset {
      border: 0;
      padding: 0 2.4rem;

      legend {
        font: 700 1.7rem Archivo;
        color: ${colors.colorTextTitle};
        margin-bottom: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 0.6rem;
        border-bottom: 1px solid ${colors.colorLineInWhite};

        button {
          width: 35%;
          height: 3.5rem;
          background: ${colors.colorSecundary};
          color: ${colors.colorButtonText};
          border: 0;
          border-radius: 0.6rem;

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
            width: 52px;
            height: 3.5rem;
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
      }
    }

    @media (min-width: 700px) {
      padding: 0 6.4rem;
    }

    fieldset + fieldset {
      margin-top: 3.4rem;
    }

    footer {
      width: 80vw;
      margin-left: -6.4rem;
      padding: 4rem 2.4rem;
      background: ${colors.colorBoxFooter};
      border-top: 1px solid ${colors.colorLineInWhite};
      margin-top: 6.4rem;

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

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        line-height: 2.4rem;
        color: ${colors.colorTextcomplement};

        img {
          margin-right: 2rem;
        }
      }
    }
  }
`;

export const ScheduleItem = styled.div`
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 2fr 2fr;
    column-gap: 2.6rem;
  }
`;
