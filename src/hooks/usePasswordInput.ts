import {useMemo, useState} from 'react';
import {validatePassword} from '../utils/validators';

const INVALID_PASSWORD = 'Password must have 6 to 20 characters.';

const usePasswordInput = () => {
  const [password, setPassword] = useState('');

  const isValid = useMemo(() => validatePassword(password), [password]);

  const error = isValid ? undefined : INVALID_PASSWORD;
  const showError = !!password && !isValid;

  return {
    password,
    setPassword,
    error,
    showError,
  };
};

export default usePasswordInput;
