import React from 'react';
import {Item, Input as NativeInput, Label, Text} from 'native-base';

type Props = {
  label: string;
  error?: string | false;
  value: string;
  onChange: any;
  isSecure?: boolean;
  onBlur: any;
  onClick?: () => void;
  disabled?: boolean;
};

export const Input = ({
  label,
  error,
  value,
  onChange,
  onBlur,
  isSecure = false,
  disabled = false,
  onClick = () => {},
}: Props) => {
  return (
    <>
      <Item
        onPress={onClick}
        error={!!error}
        style={{marginTop: 10}}
        regular
        stackedLabel
        last>
        <Label>{label}</Label>
        <NativeInput
          onTouchStart={onClick}
          disabled={disabled}
          onBlur={onBlur}
          secureTextEntry={isSecure}
          value={value}
          onChangeText={onChange}
        />
      </Item>
      {error && <Text style={{color: 'red', fontSize: 12}}> {error} </Text>}
    </>
  );
};

export default Input;
