import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useState} from 'react';

import useEmailInput from '../../hooks/useEmailInput';
import usePasswordInput from '../../hooks/usePasswordInput';
import useSignIn from '../../hooks/useSignIn';

import {RootStackParamList, Routes} from '../../navigation/MainNavigator';

const useSignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signInError, setSignInError] = useState('');
  const {
    password,
    setPassword,
    error: passwordError,
    showError: showPasswordError,
  } = usePasswordInput();
  const {
    email,
    setEmail,
    error: emailError,
    showError: showEmailError,
  } = useEmailInput();

  const signIn = useSignIn();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const isButtonDisabled = useMemo(() => {
    return !!(emailError || passwordError);
  }, [emailError, passwordError]);

  useEffect(() => {
    if (signInError) {
      setSignInError('');
    }
  }, [password, email]);

  const trySignIn = useCallback(
    async (inputEmail: string, inputPassword: string) => {
      try {
        if (isButtonDisabled) {
          return;
        }
        setSignInError('');
        setIsLoading(true);
        const {success, token, error} = await signIn(inputEmail, inputPassword);
        if (success && token) {
          setEmail('');
          setPassword('');
          navigation.navigate(Routes.Home);
        } else if (error) {
          setSignInError(error);
        }
      } catch {
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const onButtonPress = useCallback(
    () => trySignIn(email, password),
    [email, password],
  );

  return {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    isButtonDisabled,
    isLoading,
    showPasswordError,
    showEmailError,
    signInError,
    onButtonPress,
  };
};

export default useSignInScreen;
