export const validationRegex = {
  name: /^[^0-9 !@#$%^&*()_+\-={}[\]\\|'";:/?.>,<].*/,
  username: /^[a-zA-Z0-9_]*$/,
  email: /^[\w.-]+@[a-zA-Z\d.-]+/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
};

export const inputFieldsInstructions = {
  name: 'Name should not start with a number or special character.',
  username: 'Username should contain only letters, numbers, and underscores.',
  email: 'Enter a valid email address.',
  password:
    'Password must be at least 8 characters long and include a lowercase letter, an uppercase letter, a digit, and a special character.',
  confirmPassword: 'Confirm password must match the entered password.',
};

export function validateCustomerFields(firstName, lastName, phone, salesRepresntativeId, sourceName, interests, setError) {
  if (!firstName) {
    setError('Please provide a first name');
  } else if (!lastName) {
    setError('Please provide a last name');
  } else if (!phone) {
    setError('Please provide a phone number');
  } else if (!salesRepresntativeId) {
    setError('Please assign this customer to a sales representative');
  } else if (!sourceName) {
    setError('Please select the source of this customer');
  } else if (interests.length === 0) {
    setError('Please select at least one interest');
  } else {
    return true;
  }
}
