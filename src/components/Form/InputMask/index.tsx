import React, {
  InputHTMLAttributes,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';

import { useField } from '@unform/core';

import { colors } from '../../../styles';
import { Container, InputBlock, Error } from './styles';

interface Props extends InputProps {
  name: string;
  label?: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputMask: React.FC<Props> = ({
  name,
  label,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);
  return (
    <InputBlock>
      <label htmlFor={name}>{label}</label>
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        {Icon && <Icon size={16} />}
        <ReactInputMask
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color={colors.fourth} size={20} />
          </Error>
        )}
      </Container>
    </InputBlock>
  );
};
export default InputMask;
