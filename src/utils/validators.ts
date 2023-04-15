const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email: string): boolean => {
  return validEmailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return !!password && password.length >= 6 && password.length <= 20;
};

export {validateEmail, validatePassword};
