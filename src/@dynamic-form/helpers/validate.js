const W3C_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const emailValidator = (value, label) => {
  const validity = W3C_EMAIL_REGEX.test(value);
  let errorMessage = undefined;

  if (!validity) errorMessage = `${label} must be valid email address.`;

  return {
    validity,
    errorMessage,
  };
}


// NOTE: Default password requirements, can override with custom validator
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const passwordValidator = (value, label) => {
  const validity = PASSWORD_REGEX.test(value);
  let errorMessage = undefined;

  if (!validity) {
    errorMessage = `${label} must be at least 8 characters, and contain at least 1 letter, 1 number, and 1 special character.`;
  }

  return {
    validity,
    errorMessage,
  };
}
