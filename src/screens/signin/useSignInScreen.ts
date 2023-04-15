import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useMemo, useState} from 'react';

import useEmailInput from '../../hooks/useEmailInput';
import usePasswordInput from '../../hooks/usePasswordInput';
import useSignIn from '../../hooks/useSignIn';

import {RootStackParamList, Routes} from '../../navigation/MainNavigator';

const useSignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const trySignIn = async () => {
    try {
      if (isButtonDisabled) {
        return;
      }
      setIsLoading(true);
      const {success, token} = await signIn(email, password);
      if (success && token) {
        setEmail('');
        setPassword('');
        navigation.navigate(Routes.Home);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    emailError,
    password,
    setPassword,
    passwordError,
    trySignIn,
    isButtonDisabled,
    isLoading,
    showPasswordError,
    showEmailError,
  };
};

export default useSignInScreen;
