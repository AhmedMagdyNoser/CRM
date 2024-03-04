import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { globalErrorMessage } from '../../utils/utils';
import { useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import InputField from '../../components/global/InputField';
import email from '../../assets/email.svg';
import AuthMiniBox from '../../components/auth/AuthMiniBox';
import CaptionCard from '../../components/global/CaptionCard';
import Form from '../../components/global/Form';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [code, setCode] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering VerifyEmail', { loading, error });

  if (!location.state?.email) return <Navigate to="/login" replace={true} />;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (error) setError('');
      setLoading(true);
      if (location.state?.goal === 'register') {
        let response = await axios({
          method: 'POST',
          url: '/Auth/ConfirmEmail',
          data: { email: location.state.email, code },
          withCredentials: true,
        });
        setAuth(response.data);
      } else if (location.state?.goal === 'forgot-password') {
        let response = await axios({
          method: 'POST',
          url: '/Auth/VerifyCode',
          data: { email: location.state.email, code },
        });
        navigate('/reset-password', { state: { email: location.state.email, token: response.data.token } });
      }
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <AuthMiniBox backButton>
      <CaptionCard image={email} title="Check your email" paragraph="Kindly enter the verification code we sent to you." />
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitButtonLabel="Verify"
        submitButtonDisabled={code.length !== 6}
      >
        <InputField
          placeholder="Verification Code"
          className="text-center text-lg font-bold placeholder:font-normal"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
          autoFocus
        />
      </Form>
    </AuthMiniBox>
  );
}

export default VerifyEmail;
