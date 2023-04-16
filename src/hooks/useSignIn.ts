import {useCallback} from 'react';

type SignInResponse = {
  success: boolean;
  error?: string;
  token?: string;
};

const SIGN_IN_URL = 'https://reqres.in/api/login';
const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

const useSignIn = () => {
  const signIn = useCallback(
    async (email: string, password: string): Promise<SignInResponse> => {
      if (!email || !password) {
        return {success: false, error: 'Invalid credentials'};
      }

      try {
        const requestBody = JSON.stringify({email, password});
        const response = await fetch(SIGN_IN_URL, {
          method: 'POST',
          headers: DEFAULT_HEADERS,
          body: requestBody,
        }).then(data => data.json());

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
