import * as React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';

import styles from './SignInScreen.styles';
import useSignInScreen from './useSignInScreen';
import {SignInLabels, SignInTestIds} from './SignInConstants';
import {Input} from '../../components';
import {testProps} from '../../utils/testProps';

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
      <Text
        style={styles.title}
        variant="titleLarge"
        {...testProps(SignInTestIds.welcomeText)}>
        {SignInLabels.welcomeText}
      </Text>
      <Input
        value={email}
        label={SignInLabels.emailLabel}
        onChangeText={setEmail}
        error={showEmailError}
        maxLength={50}
        autoCapitalize="none"
        showError={showEmailError}
        errorText={emailError}
        {...testProps(SignInTestIds.emailInput)}
      />
      <Input
        value={password}
        label={SignInLabels.passwordLabel}
        autoCapitalize="none"
        onChangeText={setPassword}
        error={showPasswordError}
        secureTextEntry
        maxLength={20}
        showError={showPasswordError}
        errorText={passwordError}
        {...testProps(SignInTestIds.passwordInput)}
      />
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
        {...testProps(SignInTestIds.mainButton)}>
        {SignInLabels.mainButton}
      </Button>
    </View>
  );
};

export default SignInScreen;
