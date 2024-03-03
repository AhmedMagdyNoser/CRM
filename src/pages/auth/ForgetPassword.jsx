import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalErrorMessage } from '../../utils/utils';
import { validationRegex } from '../../utils/utils';
import axios from '../../api/axios';
import forgotPassword from '../../assets/forgotPassword.svg';
import InputField from '../../components/global/InputField';
import { faArrowLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import SubmitButton from '../../components/global/SubmitButton';
import ErrorAlert from '../../components/global/ErrorAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const validEmail = validationRegex.email.test(email);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering ForgetPassword', { loading, error });

  async function handleSubmit(e) {
    e.preventDefault();
    if (validEmail) {
      try {
        if (error) setError('');
        setLoading(true);
        await axios({
          method: 'POST',
          url: '/Auth/ForgotPassword',
          data: { email },
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        navigate('/verify-email', { state: { email, goal: 'forgot-password' } });
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please enter a valid email');
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-progray-50">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex h-full w-full animate-fade-in-fast flex-col justify-between gap-3 bg-white p-6 sm:h-fit sm:w-[500px] sm:rounded-xl sm:p-12 sm:shadow-lg lg:w-[650px]"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-[215px]">
            <img className="w-full" src={forgotPassword} alt="Forgot password" />
          </div>
          <h1 className="text-center text-2xl font-bold capitalize text-progray-300 sm:text-3xl">Forgot password</h1>
          <p className="text-center text-progray-200">Please Enter your email address below</p>
          <InputField
            type="email"
            placeholder="Email"
            icon={faEnvelope}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={50}
            autoFocus
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          {error && <ErrorAlert message={error} />}
          <SubmitButton label="Continue" loading={loading} disabled={!validEmail || loading} />
          <button
            onClick={() => navigate(-1)}
            className="self-start rounded-md px-5 py-2 uppercase text-progray-200 transition-colors hover:bg-progray-100"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
