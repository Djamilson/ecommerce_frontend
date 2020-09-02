import styled, { css } from 'styled-components';

import { colors } from '../../../styles';
import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const InputBlock = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 0 10px 0px 10px;

  && {
    margin-top: 1.4rem;
  }

  label {
    font-size: 1.1rem;
    color: ${colors.colorTextcomplement};
  }
`;

export const Container = styled.div<ContainerProps>`
  background: ${colors.colorInputBackground};
  border-radius: 10px;
  border: 1px solid ${colors.colorLineInWhite};
  padding: 12.8px;
  width: 100%;

  border-radius: 10px;
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

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
    font-size: 1.15rem;
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
