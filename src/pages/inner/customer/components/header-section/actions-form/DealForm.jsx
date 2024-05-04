import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { globalErrorMessage } from '../../../../../../utils/utils';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import Form from '../../../../../../components/ui/Form';
import Alert from '../../../../../../components/ui/Alert';
import InputField from '../../../../../../components/ui/InputField';
import DropdownMenu from '../../../../../../components/ui/DropdownMenu';
import icons from '../../../../../../utils/faIcons';
import useInterests from '../../../../../../hooks/useInterests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DealForm({ setSelectedType }) {
  const privateAxios = usePrivateAxios();

  const id = useParams().id;

  const { interests } = useInterests();

  const [price, setPrice] = useState('');
  const [interestId, setInterestId] = useState('');
  const [summary, setSummary] = useState('');

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
        url: '/SalesRep/AddDeal',
        data: { customerId: +id, price, interestId, summary, date: new Date(), followUp: null },
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
      <div className="flex items-center gap-1">
        <button type="button" className="btn-light h-10 w-10 rounded-full" onClick={() => setSelectedType(null)}>
          <FontAwesomeIcon icon={icons.back} />
        </button>
        <h2 className="text-xl font-semibold">Add New Deal</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="min-w-48 flex-1">
          <DropdownMenu
            icon={icons.interest}
            placeholder="Select an Interest"
            options={interests.data.enabled.map((i) => ({ value: i.id, label: i.name }))}
            selected={interestId}
            setSelected={setInterestId}
          />
        </div>
        <div className="min-w-48 flex-1">
          <InputField
            icon={icons.money}
            placeholder="Price"
            value={price}
            onChange={(e) => {
              /^[0-9]*$/.test(e.target.value) && setPrice(e.target.value);
            }}
          />
        </div>
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
