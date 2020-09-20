import React, {
  InputHTMLAttributes,
  useCallback,
  useState,
  useRef,
} from 'react';

import { useField } from '@unform/core';

import { SelectBlock } from './styles';
import { Container } from './styles';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  containerStyle?: object;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <SelectBlock>
      <label htmlFor={name}>{label}</label>
      <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
      >
        <select defaultValue="" id={name} {...rest}>
          <option value="" disabled hidden>
            Selecione
          </option>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </Container>
    </SelectBlock>
  );
};

export default Select;
