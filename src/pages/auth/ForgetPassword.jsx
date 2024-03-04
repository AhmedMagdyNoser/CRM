import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalErrorMessage } from '../../utils/utils';
import { validationRegex } from '../../utils/utils';
import axios from '../../api/axios';
import forgotPassword from '../../assets/forgotPassword.svg';
import InputField from '../../components/global/InputField';
import CaptionCard from '../../components/global/CaptionCard';
import AuthMiniBox from '../../components/auth/AuthMiniBox';
import Form from '../../components/global/Form';

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
    <AuthMiniBox backButton>
      <CaptionCard image={forgotPassword} title="Forgot password?" paragraph="Please enter your email address below." />
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitButtonLabel="Continue"
        submitButtonDisabled={!validEmail}
      >
        <InputField.Email placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
      </Form>
    </AuthMiniBox>
  );
}

export default ForgetPassword;
