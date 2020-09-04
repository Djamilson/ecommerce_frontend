import { Link } from 'react-router-dom';

import { shade } from 'polished';
import styled from 'styled-components';

import { colors } from '../../../styles';

export const Container = styled.div``;

export const Header = styled.div`
  padding: 32px 0;
  background: #28262e;
`;

export const BoxLogin = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    align-items: center;
    justify-content: center;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;
      display: flex;

      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;

      span svg {
        color: #fff;
        margin-top: 5px;
        width: 20px;
        height: 20px;
        margin-left: 15px;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const HeaderContainer = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Cart = styled(Link)`
  display: flex;
  margin-left: 45%;

  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;

export const BoxLogado = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;
`;

export const ButtonLogout = styled.button`
  display: flex;
  align-items: center;

  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
