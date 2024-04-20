import { useState } from 'react';
import { inputFieldsInstructions, validationRegex } from '../../../../../utils/validation';
import { globalErrorMessage } from '../../../../../utils/utils';
import useDocumentTitle from '../../../../../hooks/useDocumentTitle';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import useLogout from '../../../../../hooks/useLogout';
import Form from '../../../../../components/ui/Form';
import InputField from '../../../../../components/ui/InputField';

export default function ChangePasswordPage() {
  useDocumentTitle('Change Password');

  const privateAxios = usePrivateAxios();

  const logout = useLogout();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmNewPassword] = useState('');

  const isValidNewPassword = validationRegex.password.test(newPassword);
  const isValidConfirmNewPassword = confirmPassword === newPassword;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isValidNewPassword && isValidConfirmNewPassword) {
      try {
        setError('');
        setLoading(true);
        await privateAxios({
          method: 'PUT',
          url: '/userprofile/update-password',
          data: { currentPassword, newPassword, confirmPassword },
        });
        logout();
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
    <div>
      <h1 className="mb-8">Change Password</h1>
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Save Changes"
        submitDisabled={!(isValidNewPassword && isValidConfirmNewPassword)}
        className="sm:w-[500px] sm:overflow-auto"
      >
        <p>Please provide the following details.</p>
        <div className="sm:flex-column flex flex-col gap-5">
          <InputField.Password
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            isValid={!!currentPassword}
            required
          />
          <InputField.Password
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            isValid={isValidNewPassword}
            required
          />
          <InputField.Password
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            instructions={inputFieldsInstructions.confirmPassword}
            isValid={isValidConfirmNewPassword}
            required
          />
        </div>
      </Form>
    </div>
  );
}
