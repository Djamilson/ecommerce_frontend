import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

import { colors } from '../../../styles';
// import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
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

const appearFromRight = keyframes`
  from{
    opacity:0;
    transform: translateX(50px);
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
  animation: ${appearFromRight} 1s;

  form {
    margin-top: 60px;
    margin-bottom: 30px;
    width: 340px;
    text-align: center;

    background: ${colors.colorBoxBase};
    width: 100%;
    max-width: 74rem;
    border-radius: 0.8rem;

    padding-top: 6.4rem;
    overflow: hidden;

    header {
      background: ${colors.colorBoxFooter};
      border-bottom: 1px solid ${colors.colorLineInWhite};
      margin-top: -6.4rem;
      margin-bottom: 5rem;

      @media (min-width: 700px) {
        padding: 2rem 1.4rem;
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

margin: 80px;
width: 100%;
       height: 3.3rem;
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
        margin-top: 3.2rem;

span {

        background: rgba(0, 0, 0, 0.08);
        width: 62px;
        height: 3.3rem;
        border-radius: 0.8rem 0 0 0.8rem;
margin-left: -15px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;

      }



       strong {
        flex: 1;
        text-align: center;
        color: #fff;
      }

      &:hover {
        background: ${shade(0.2, `${colors.colorSecundary}`)};
      }

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
        line-height: 2.4rem;
        color: ${colors.colorTextcomplement};

        img {
          margin-right: 2rem;
        }
      }



    h1 {
      margin-bottom: 24px;
    }

    a {
      color: ${colors.primary};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      padding-bottom: -110px;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    bottom: 120px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;
/*
export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;
*/
