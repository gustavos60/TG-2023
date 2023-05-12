import React from 'react';
import {View} from 'react-native';
import {Text, TextInput, TextInputProps} from 'react-native-paper';

import styles from './Input.styles';

export type InputProps = TextInputProps & {
  showError?: boolean;
  errorText?: string;
};

export const Input = (props: InputProps) => {
  const {showError, errorText, ...inputProps} = props;
  return (
    <>
      <TextInput style={styles.input} error={showError} {...inputProps} />
      <View style={styles.errorContainer}>
        {showError && (
          <Text variant="labelSmall" style={styles.errorMessage}>
            {errorText}
          </Text>
        )}
      </View>
    </>
  );
};
