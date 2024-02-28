import { useState } from 'react';
import { Link } from 'react-router-dom';
import { globalErrorMessages } from '../../utils/utils';
import RegisterInputField from '../../components/auth/RegisterInputField';

const nameRegex = /^[^0-9 !@#$%^&*()_+\-={}[\]\\|'";:/?.>,<].*/; // Should not start with a number or special character
const userNameRegex = /^[a-zA-Z0-9_]*$/; // Should contain only letters, numbers, and underscores
const emailRegex = /^.+@.+/; // Should contain @ and at least one character before and after it
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/; // Should contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validFirstName = nameRegex.test(firstName);
  const validLastName = nameRegex.test(lastName);
  const validUserName = userNameRegex.test(userName);
  const validEmail = emailRegex.test(email);
  const validPassword = passwordRegex.test(password);
  const validConfirmPassword = confirmPassword === password;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering Register');

  function handleSubmit(e) {
    e.preventDefault();
    if (validFirstName && validLastName && validUserName && validEmail && validPassword && validConfirmPassword) {
      try {
        if (error) setError('');
        setLoading(true);
        // Send the data to the server
        // Navigate to the email verification page
      } catch (error) {
        setLoading(false);
        setError(error.response?.data || globalErrorMessages);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please enter valid information');
    }
  }

  return (
    <section>
      <h1>Create your account</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <RegisterInputField
          label="First Name"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          isValid={validFirstName}
          maxLength={18}
          required
          autoFocus
        />
        <RegisterInputField
          label="Last Name"
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          isValid={validLastName}
          maxLength={18}
          required
        />
        <RegisterInputField
          label="Username"
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          isValid={validUserName}
          maxLength={18}
          required
        />
        <RegisterInputField
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isValid={validEmail}
          maxLength={50}
          required
        />
        <RegisterInputField
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isValid={validPassword}
          maxLength={32}
          required
        />
        <RegisterInputField
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isValid={validConfirmPassword}
          maxLength={32}
          required
        />
        <button
          type="submit"
          disabled={
            !(validFirstName && validLastName && validUserName && validEmail && validPassword && validConfirmPassword) ||
            loading
          }
        >
          Register
        </button>
        {error ? <div>{error}</div> : loading ? <div>Loading...</div> : null}
      </form>
      <div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
