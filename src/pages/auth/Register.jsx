import { useState } from 'react';
import { Link } from 'react-router-dom';
import { globalErrorMessages } from '../../utils/utils';

const nameRegex = /^[^0-9!@#$%^&*()_+\-={}[\]\\|'";:/?.>,<].*/; // Should not start with a number or special character
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
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            maxLength={18}
            required
            autoFocus
          />
          {firstName && (validFirstName ? 1 : 0)}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            maxLength={18}
            required
          />
          {lastName && (validLastName ? 1 : 0)}
        </div>
        <div>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            maxLength={18}
            required
          />
          {userName && (validUserName ? 1 : 0)}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={50} required />
          {email && (validEmail ? 1 : 0)}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={32}
            required
          />
          {password && (validPassword ? 1 : 0)}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            maxLength={32}
            required
          />
          {confirmPassword && (validConfirmPassword ? 1 : 0)}
        </div>
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
