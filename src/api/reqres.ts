const BASE_URL = 'https://reqres.in/api';

const SIGN_IN_URL = `${BASE_URL}/login`;
const DEFAULT_HEADERS = {'Content-Type': 'application/json'};

const reqResSignIn = async (email: string, password: string) => {
  const requestBody = JSON.stringify({email, password});
  const response = await fetch(SIGN_IN_URL, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: requestBody,
  }).then(data => data.json());

  return response;
};

export {reqResSignIn};
