import {useMemo, useState} from 'react';
import {validateEmail} from '../utils/validators';

const INVALID_EMAIL = 'Invalid email';

const useEmailInput = () => {
  const [email, setEmail] = useState('');

  const isValid = useMemo(() => {
    return validateEmail(email);
  }, [email]);

  const error = isValid ? undefined : INVALID_EMAIL;
  const showError = !!email && !isValid;

  return {
    email,
    setEmail,
    error,
    showError,
  };
};

export default useEmailInput;
