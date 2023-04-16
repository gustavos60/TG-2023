import * as React from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';

import styles from './SignInScreen.styles';
import useSignInScreen from './useSignInScreen';

const SignInScreen = () => {
  const {
    email,
    emailError,
    isButtonDisabled,
    password,
    passwordError,
    setEmail,
    setPassword,
    onButtonPress,
    isLoading,
    signInError,
    showEmailError,
    showPasswordError,
  } = useSignInScreen();

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="titleLarge">
        Please enter your credentials
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        label="Email"
        onChangeText={setEmail}
        error={showEmailError}
        maxLength={50}
        testID="SignInEmailInput"
      />
      <View style={styles.errorContainer}>
        {showEmailError && (
          <Text variant="labelSmall" style={styles.errorMessage}>
            {emailError}
          </Text>
        )}
      </View>
      <TextInput
        style={styles.input}
        value={password}
        label="Password"
        onChangeText={setPassword}
        error={showPasswordError}
        secureTextEntry
        maxLength={20}
        testID="SignInPasswordInputId"
      />
      <View style={styles.errorContainer}>
        {showPasswordError && (
          <Text variant="labelSmall" style={styles.errorMessage}>
            {passwordError}
          </Text>
        )}
      </View>
      <View style={styles.errorContainer}>
        {!!signInError && (
          <Text variant="labelSmall" style={styles.errorMessage}>
            {signInError}
          </Text>
        )}
      </View>
      <Button
        style={styles.button}
        loading={isLoading}
        mode="contained-tonal"
        disabled={isButtonDisabled}
        onPress={onButtonPress}
        testID="SignInMainButton">
        Log in
      </Button>
    </View>
  );
};

export default SignInScreen;
