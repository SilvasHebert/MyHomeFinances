import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInputProps,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import colors from '../consts/colors';

type WrappedCurrencyInputProps = TextInputProps & {
  label?: string;
};

export function WrappedCurrencyInput({label, ...props}: WrappedCurrencyInputProps) {
  return (
    <KeyboardAvoidingView style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <CurrencyInput
        style={styles.textInput}
        placeholder={props.placeholder}
        placeholderTextColor={colors.icon}
        prefix="R$"
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...props}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.secondary,
    borderRadius: 6,
    padding: 12,
  },
  label: {
    color: colors.gray,
    fontSize: 17,
    fontWeight: 'bold'
  },
  textInput: {
    backgroundColor: colors.secondary,
    color: colors.white,
    fontSize: 16,
    paddingLeft: 0,
  },
});
