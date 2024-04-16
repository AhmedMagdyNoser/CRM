const EMAIL_PART_REGEX = /[a-zA-Z\d]([a-zA-Z\d.-]*[a-zA-Z\d])?/;
const EMAIL_REGEX = new RegExp(`^${EMAIL_PART_REGEX.source}@${EMAIL_PART_REGEX.source}\\.[a-zA-Z0-9]+$`);

export const validationRegex = {
  name: /^[^0-9 !@#$%^&*()_+\-={}[\]\\|'";:/?.>,<].*/,
  username: /^[a-zA-Z0-9_]*$/,
  email: EMAIL_REGEX,
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

export function validateCustomerFields({ firstName, lastName, phone, salesRepresentativeId, sourceId, interests }, setError) {
  if (!firstName) {
    setError('Please provide a first name');
  } else if (!lastName) {
    setError('Please provide a last name');
  } else if (!phone) {
    setError('Please provide a phone number');
  } else if (!salesRepresentativeId) {
    setError('Please assign this customer to a sales representative');
  } else if (!sourceId) {
    setError('Please select the source of this customer');
  } else if (interests.length === 0) {
    setError('Please select at least one interest');
  } else {
    return true;
  }
}
