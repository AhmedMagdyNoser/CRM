import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { globalErrorMessage } from '../../../../../../utils/utils';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import Form from '../../../../../../components/ui/Form';
import Alert from '../../../../../../components/ui/Alert';
import Checkbox from '../../../../../../components/ui/Checkbox';

export default function MeetingForm() {
  const privateAxios = usePrivateAxios();

  const id = useParams().id;

  const [summary, setSummary] = useState('');
  const [online, setOnline] = useState(false);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await privateAxios({
        method: 'POST',
        url: '/SalesRep/AddMeeting',
        data: { customerId: +id, online, summary, date: new Date(), followUp: null },
      });
      setSuccess(true);
    } catch (error) {
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitDisabled={loading || !summary}
      submitLabel="Add Action"
      className="animate-fade-in-fast p-5"
    >
      <div className="scrollbar-hide flex gap-2 overflow-x-auto">
        <Checkbox label='Online Meeting' checked={online} onClick={() => setOnline(!online)} />
      </div>
      <textarea
        placeholder="Summary"
        className="h-32 resize-none rounded-xl bg-gray-100 p-4 text-gray-500 outline-none"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        autoFocus
      />
      {success && <Alert.Success message="Action added successfully." />}
    </Form>
  );
}
