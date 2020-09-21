import { darken } from 'polished';
import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import { colors } from '../../../styles';

export const Container = styled.div`
  margin: 0 3rem;
  margin-top: 1rem;
`;

export const Box = styled.div`
  margin-top: 6rem;
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from{
    opacity:0;
    transform: translateX(-50px);
  }
  to{
    opacity:1;
    transform: translateX(0px)
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromLeft} 1s;

  form {
    background: ${colors.colorBoxBase};
    width: 50rem;
    margin-top: 8rem;
    text-align: center;
    max-width: 34rem;
    border-radius: 0.8rem;

    overflow: hidden;

    header {
      background: ${colors.colorBoxFooter};
      border-bottom: 1px solid ${colors.colorLineInWhite};
      width: 85vw;
      height: 2.5rem;

      margin-top: -0.4rem;
      margin-bottom: 5rem;
      margin-left: -16.4rem;

      @media (min-width: 700px) {
        padding: 3rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      p {
        @media (min-width: 700px) {
          margin-left: 19rem;
          justify-content: space-between;
        }
      }

      button {
        @media (min-width: 700px) {
          margin: 0 6rem 0 0;
          width: 23%;
        }
        width: 35%;
        height: 2.8rem;
        background: ${colors.colorSecundary};
        color: ${colors.colorButtonText};
        border: 0;
        border-radius: 0.4rem;

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

    fieldset {
      border: 0;
      padding: 2rem 2rem 2rem 1rem;
      margin-top: -3.5rem;

      legend {
        font: 700 1.3rem Archivo;
        color: ${colors.colorTextTitle};
        margin-bottom: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid ${colors.colorLineInWhite};

        button {
          width: 35%;
          height: 2.8rem;
          background: ${colors.colorSecundary};
          color: ${colors.colorButtonText};
          border: 0;
          border-radius: 0.4rem;

          font: 700 1.1rem Archivo;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background-color 0.2s;
          margin-top: 0.2rem;
          margin-bottom: 1.2rem;

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
      }
    }

    fieldset + fieldset {
      margin-top: -3.4rem;
    }

    footer {
      width: 85vw;
      margin-left: -6.4rem;
      padding: 0rem 2.4rem;
      background: ${colors.colorBoxFooter};
      border-top: 1px solid ${colors.colorLineInWhite};
      margin-top: -2.4rem;

      @media (min-width: 700px) {
        padding: 1rem 10.4rem;
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
        font-size: 1.1rem;
        line-height: 1.4rem;
        color: ${colors.colorTextcomplement};

        img {
          margin-right: 2rem;
        }
      }
    }
  }
`;

export const Background = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
`;
export const CardItem = styled.div`
  @media (min-width: 700px) {
    margin-top: -1.6rem;
    width: 82%;
  }
`;
export const CardFee = styled.div`
  @media (min-width: 700px) {
    margin-top: -4rem;
    margin-bottom: 2rem;
    padding-right: 7rem;
    display: grid;
    grid-template-columns: 2fr 2fr;
    column-gap: 0.1rem;
    section {
      display: flex;

      align-items: center;
      justify-content: center;

      margin-top: 55px;
      button + button {
      }

      button {
        width: 65%;
        height: 2.4rem;
        margin-right: 5px;
        background: ${colors.colorSecundary};
        color: ${colors.colorButtonText};
        border: 0;
        border-radius: 0.4rem;

        font: 700 0.8rem Archivo;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: background-color 0.2s;
        margin-top: 0.2rem;
        margin-bottom: 1.2rem;

        span {
          display: block;
          background: rgba(0, 0, 0, 0.08);
          width: 52px;

          height: 2.4rem;
          border-radius: 0.6rem 0 0 0.6rem;

          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        strong {
          flex: 1;
          text-align: center;
          color: #fff;

          padding: 0 0.5rem;
        }

        &:hover {
          background: ${shade(0.2, `${colors.colorSecundary}`)};
        }
      }
    }
  }
`;

export const InstallmentItem = styled.div`
  @media (min-width: 700px) {
    margin-top: -3rem;
    margin-left: 0.7rem;
    margin-bottom: 3rem;
    display: grid;
    grid-template-columns: 65% 35%;
    column-gap: 0.1rem;
  }
`;
export const ScheduleItem = styled.div`
  @media (min-width: 700px) {
    margin-top: -0.4rem;
    margin-bottom: 3rem;
    padding-right: 7rem;
    display: grid;
    grid-template-columns: 2fr 2fr;
    column-gap: 0.1rem;
  }
`;
