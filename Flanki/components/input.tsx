import React from 'react'
import { Item, Input as NativeInput, Label, Text } from "native-base";

type Props = {
  label: string;
  error?: string;
  value: string;
  onChange: any
  isSecure?: boolean,
  onBlur: any;
}

export const Input = ({ label, error, value, onChange, isSecure = false, onBlur }: Props) => {
  return <>
    <Item error={!!error} style={{ marginTop: 10 }} regular stackedLabel last>
      <Label>{label}</Label>
      <NativeInput onBlur={onBlur} secureTextEntry={isSecure} value={value} onChangeText={onChange} />
    </Item>
    {error && <Text style={{ color: 'red', fontSize: 12 }}> {error} </Text>}
  </>
}

export default Input
