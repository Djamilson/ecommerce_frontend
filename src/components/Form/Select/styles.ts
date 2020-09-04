import styled, { css } from 'styled-components';

import { colors } from '../../../styles';
import Tooltip from '../../Tooltip';

export const SelectBlock = styled.div`
  display: flex;
  flex-direction: column;

  && {
    margin-top: 1.4rem;
  }

  label {
    font-size: 0.9rem;
    color: ${colors.colorTextcomplement};
    font-weight: bold;
    margin-bottom: 0.2rem;
  }

  select {
    transition: background-color 5000s ease-in-out 0s;

    text-indent: 0.01px; /* Remove seta padrão do FireFox */
    text-overflow: ''; /* Remove seta padrão do FireFox */
    select::-ms-expand {
      display: none;
    } /* Remove seta padrão do IE*/

    display: block;
    font-size: 0.9rem;
    font-family: sans-serif;
    font-weight: 500;
    color: #444;
    line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    width: 100%;
    max-width: 100%; /* useful when width is set to anything other than 100% */
    box-sizing: border-box;
    margin: 0;
    border: 0px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: 0.5em;

    -webkit-text-fill-color: ${colors.colorTextcomplement};
    -webkit-appearance: none; /* Remove estilo padrão do Chrome */
    -moz-appearance: none; /* Remove estilo padrão do FireFox */
    appearance: none; /* Remove estilo padrão do FireFox*/

    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffff 0%, #e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    background-position: right 0.7em top 50%, 0 0;
    /* icon size, then gradient */
    background-size: 0.65em auto, 100%;
    outline: 0;
  }
`;

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${colors.colorInputBackground};
  border-radius: 7px;
  border: 1px solid ${colors.colorLineInWhite};

  padding: 0px;
  width: 100%;




  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${colors.fourth};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: ${colors.colorPrimary};
      border-color: ${colors.colorPrimaryDarker};
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: ${colors.colorPrimaryDarker};
    `}


  input {
    flex: 1;
    border: 0;
    font-size: 1.1rem;
    color: ${colors.colorPrimary};
    transition: background-color 5000s ease-in-out 0s;
    background: transparent;
    -webkit-text-fill-color: ${colors.colorTextcomplement};

    &::placeholder {
      color: ${colors.colorTextInPrimary};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: ${colors.fourth};
    color: ${colors.sixth};
    &::before {
      border-color: ${colors.fourth} transparent;
    }
  }
`;
