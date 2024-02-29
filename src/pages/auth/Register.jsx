import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { globalErrorMessage, validationRegex, inputFieldsInstructions } from '../../utils/utils';
import RegisterInputField from '../../components/auth/RegisterInputField';
import axios from '../../api/axios';

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validFirstName = validationRegex.name.test(firstName);
  const validLastName = validationRegex.name.test(lastName);
  const validUserName = validationRegex.username.test(username);
  const validEmail = validationRegex.email.test(email);
  const validPassword = validationRegex.password.test(password);
  const validConfirmPassword = confirmPassword === password;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering Register', { loading, error });

  async function handleSubmit(e) {
    e.preventDefault();
    if (validFirstName && validLastName && validUserName && validEmail && validPassword && validConfirmPassword) {
      try {
        if (error) setError('');
        setLoading(true);
        await axios({
          method: 'POST',
          url: '/auth/register',
          data: { firstName, lastName, userName: username, email, password, confirmPassword },
        });
        navigate('/verify-email', { state: { email, goal: 'register' } });
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
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
          instructions={inputFieldsInstructions.name}
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
          instructions={inputFieldsInstructions.name}
          isValid={validLastName}
          maxLength={18}
          required
        />
        <RegisterInputField
          label="Username"
          type="text"
          id="userName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          instructions={inputFieldsInstructions.username}
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
          instructions={inputFieldsInstructions.email}
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
          instructions={inputFieldsInstructions.password}
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
          instructions={inputFieldsInstructions.confirmPassword}
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
          {loading ? 'Loading...' : 'Register'}
        </button>
        {error && <div>{error}</div>}
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
