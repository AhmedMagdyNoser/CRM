import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { globalErrorMessage, validationRegex, inputFieldsInstructions } from '../../utils/utils';
import RegisterInputField from '../../components/auth/RegisterInputField';
import axios from '../../api/axios';
import { faAddressBook, faEnvelope, faLock, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorAlert from '../../components/global/ErrorAlert';

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
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <section className="rounded-xl bg-white shadow-lg">
        <div className="w-[545px] p-12">
          <h1 className="mb-5 text-3xl font-bold capitalize text-gray-800">Create your account</h1>
          <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-3">
            <div className="flex justify-stretch gap-3">
              <RegisterInputField
                type="text"
                placeholder="First Name"
                icon={faUser}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                instructions={inputFieldsInstructions.name}
                isValid={validFirstName}
                maxLength={18}
                required
                autoFocus
              />
              <RegisterInputField
                type="text"
                placeholder="Last Name"
                icon={faUser}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                instructions={inputFieldsInstructions.name}
                isValid={validLastName}
                maxLength={18}
                required
              />
            </div>
            <RegisterInputField
              type="text"
              placeholder="Username"
              icon={faAddressBook}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              instructions={inputFieldsInstructions.username}
              isValid={validUserName}
              maxLength={18}
              required
            />
            <RegisterInputField
              type="email"
              placeholder="Email"
              icon={faEnvelope}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              instructions={inputFieldsInstructions.email}
              isValid={validEmail}
              maxLength={50}
              required
            />
            <RegisterInputField
              type="password"
              placeholder="Password"
              icon={faLock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              instructions={inputFieldsInstructions.password}
              isValid={validPassword}
              maxLength={32}
              required
            />
            <RegisterInputField
              type="password"
              placeholder="Confirm Password"
              icon={faLock}
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
              className="w-full rounded-md bg-pro-400 p-3 font-bold uppercase text-white transition hover:bg-pro-300 disabled:opacity-50 disabled:hover:bg-pro-400"
            >
              {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" /> : 'Register'}
            </button>
            {error && <ErrorAlert message={error} />}
          </form>
          <div className="mt-3 flex justify-center">
            <p>
              <span className="text-gray-800">Already have an account?</span>{' '}
              <Link className="font-bold text-pro-300 transition-colors hover:text-pro-400" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
