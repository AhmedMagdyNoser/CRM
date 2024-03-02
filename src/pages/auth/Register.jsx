import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { globalErrorMessage, validationRegex, inputFieldsInstructions } from '../../utils/utils';
import RegisterInputField from '../../components/global/InputField';
import axios from '../../api/axios';
import { faAddressBook, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from '../../components/global/ErrorAlert';
import FormSubmitButton from '../../components/global/SubmitButton';
import register from '../../assets/register.svg';
import ImageFormBox from '../../components/auth/ImageFormBox';

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
    <ImageFormBox image={register}>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex h-full w-full flex-col justify-between gap-3 p-6 sm:h-[600px] sm:w-[600px] sm:p-12"
      >
        <div className="flex flex-1 flex-col gap-3 overflow-auto">
          <h1 className="text-progray-300 my-4 text-2xl font-bold capitalize sm:text-3xl">Create your account</h1>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-stretch">
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
        </div>

        <div className="flex flex-col gap-3">
          {error && <ErrorAlert message={error} />}
          <FormSubmitButton
            label="Register"
            loading={loading}
            disabled={
              !(validFirstName && validLastName && validUserName && validEmail && validPassword && validConfirmPassword) ||
              loading
            }
          />
          <div className="flex justify-center gap-1">
            <span className="text-progray-300">Already have an account?</span>
            <Link className="font-bold text-pro-200 transition-colors hover:text-pro-300" to="/login">
              Login
            </Link>
          </div>
        </div>
      </form>
    </ImageFormBox>
  );
}

export default Register;
