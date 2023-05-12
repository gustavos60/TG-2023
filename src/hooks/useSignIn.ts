import {useCallback} from 'react';
import {reqResSignIn} from '../api/reqres';

type SignInResponse = {
  success: boolean;
  error?: string;
  token?: string;
};

const useSignIn = () => {
  const signIn = useCallback(
    async (email: string, password: string): Promise<SignInResponse> => {
      if (!email || !password) {
        return {success: false, error: 'Invalid credentials'};
      }

      try {
        const response = await reqResSignIn(email, password);

        const success = !!response.token;

        return {success, token: response.token, error: response.error};
      } catch {
        return {success: false};
      }
    },
    [],
  );

  return signIn;
};

export default useSignIn;
