import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalErrorMessage, validationRegex, inputFieldsInstructions } from '../../utils/utils';
import InputField from '../../components/global/InputField';
import axios from '../../api/axios';
import { faAddressBook, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import register from '../../assets/register.svg';
import FormBox from '../../components/auth/FormBox';

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
    <FormBox
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      image={register}
      fixedHeightOnSMScreen
      title="Create your account"
      submitButtonLabel="Register"
      submitButtonDisabled={
        !(validFirstName && validLastName && validUserName && validEmail && validPassword && validConfirmPassword)
      }
      leave={{ hint: 'Already have an account?', label: 'Login', link: '/login' }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-stretch">
        <InputField
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
        <InputField
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
      <InputField
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
      <InputField
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
      <InputField
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
      <InputField
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
    </FormBox>
  );
}

export default Register;
