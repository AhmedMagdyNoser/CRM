import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalErrorMessage, validationRegex } from '../../utils/utils';
import InputField from '../../components/global/InputField';
import axios from '../../api/axios';
import register from '../../assets/register.svg';
import AuthMaxBox from '../../components/auth/AuthMaxBox';
import Form from '../../components/global/Form';

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
    <AuthMaxBox
      image={register}
      title="Create your account"
      leave={{ hint: 'Already have an account?', label: 'Login', link: '/login' }}
    >
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitButtonLabel="Register"
        submitButtonDisabled={
          !(validFirstName && validLastName && validUserName && validEmail && validPassword && validConfirmPassword)
        }
        className="overflow-auto sm:h-[415px]"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <InputField.Name
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            isValid={validFirstName}
            required
            autoFocus
          />
          <InputField.Name
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            isValid={validLastName}
            required
          />
        </div>
        <InputField.Username
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          isValid={validUserName}
          required
        />
        <InputField.Email
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isValid={validEmail}
          required
        />
        <InputField.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isValid={validPassword}
          required
        />
        <InputField.ConfirmPassword
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isValid={validConfirmPassword}
          required
        />
      </Form>
    </AuthMaxBox>
  );
}

export default Register;
