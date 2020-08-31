import { Link } from 'react-router-dom';

import { darken } from 'polished';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
`;

export const Title = styled.span`
  font-size: ${fonts.large}px;
  font-weight: bold;
  width: 100%;
`;

export const ContentButton = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
  justify-content: space-between;
`;

export const GobackLink = styled(Link)`
  width: 100%;
  max-width: 135px;
  height: 35px;

  margin-right: 15px;

  text-decoration: none;
  border: 0;
  padding: 0;

  display: flex;
  align-items: center;
  overflow: hidden;

  margin-top: 0px;

  span {
    display: block;
    background: rgba(0, 0, 0, 0.08);

    width: 35px;
    height: 35px;

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
    background: ${darken(0.03, '#3b9eff')};
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 135px;
  height: 35px;
  background: var(--primary-color);
  border-radius: 4px;
  text-decoration: none;
  border: 0;
  padding: 0;

  display: flex;
  align-items: center;
  overflow: hidden;

  margin-top: 0px;

  span {
    display: block;
    background: rgba(0, 0, 0, 0.08);

    width: 35px;
    height: 35px;

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
    background: #2fb86e;
  }
`;
