import {useCallback} from 'react';

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
        const requestBody = JSON.stringify({email, password});
        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: requestBody,
        }).then(data => data.json());
        console.log({response});
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
