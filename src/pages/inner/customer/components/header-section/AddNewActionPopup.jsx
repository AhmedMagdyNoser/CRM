import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { breakboints, globalErrorMessage } from '../../../../../utils/utils';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import Modal from '../../../../../components/ui/Modal';
import Form from '../../../../../components/ui/Form';
import Alert from '../../../../../components/ui/Alert';

export default function AddNewActionPopup({ setAddNewActionPopupOpen }) {
  const privateAxios = usePrivateAxios();

  const id = useParams().id;

  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState(0);

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
        url: '/SalesRep/AddCall',
        data: { customerId: +id, status, summary, date: new Date(), followUp: null },
      });
      setSuccess(true);
    } catch (error) {
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal title="Add New Action" setOpen={setAddNewActionPopupOpen} className="auto-height">
      <div>
        <Form
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          submitDisabled={loading || !summary}
          submitLabel="Add Action"
          className="p-5"
        >
          <p>Call Status:</p>
          <div className="scrollbar-hide flex gap-2 overflow-x-auto">
            {['Completed', 'Missed', 'Cancelled', 'Busy', 'Failed'].map((statusName, index) => (
              <button
                type="button"
                key={statusName}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${index === status ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setStatus(index)}
              >
                {statusName}
              </button>
            ))}
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
      </div>
      <style>
        {`
          @media (min-width: ${breakboints.sm}) {
            .auto-height {
              height: auto !important;
            }
          }
        `}
      </style>
    </Modal>
  );
}
