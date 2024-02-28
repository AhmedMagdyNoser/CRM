export const globalErrorMessages = 'Something went wrong. Please try again later.';

export const validationRegex = {
  name: /^[^0-9 !@#$%^&*()_+\-={}[\]\\|'";:/?.>,<].*/, // Should not start with a number or special character
  userName: /^[a-zA-Z0-9_]*$/, // Should contain only letters, numbers, and underscores
  email: /^.+@.+/, // Should contain @ and at least one character before and after it
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, // Should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long
};
