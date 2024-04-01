import { useState } from 'react';
import { globalErrorMessage } from '../../../../../../utils/utils';
import { validateCustomerFields } from '../../../../../../utils/validation';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import InputField from '../../../../../../components/ui/InputField';
import Form from '../../../../../../components/ui/Form';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

// Task: This page needs to be refactored with the new data structure

function CustomerEditingMode({ customer, setEditingMode }) {
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();

  // Required fields
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [phone, setPhone] = useState(customer.phone);
  const [salesRepresntativeId] = useState(customer.salesRepresntativeId);
  const [sourceName] = useState(customer.sourceName);
  const [interests] = useState(customer.userInterests);

  // Optional fields
  const [email, setEmail] = useState(customer.email);
  const [city, setCity] = useState(customer.city);
  const [age, setAge] = useState(customer.age);
  const [gender] = useState(customer.gender);

  // Options
  // const { data: salesOptions, loading: salesOptionsLoading } = useOnLoadFetch('/moderator/get-all-sales');
  // const { data: sourcesOptions, loading: sourcesOptionsLoading } = useOnLoadFetch('/shared/get-all-sources');
  // const { data: interestsOptions, loading: interestsOptionsLoading } = useOnLoadFetch('/shared/get-all-interests');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError('');
      if (!validateCustomerFields(firstName, lastName, phone, salesRepresntativeId, sourceName, interests, setError)) return;
      setLoading(true);
      await privateAxios({
        url: `/moderator/update-customer?CustomerId=${customer.id}`,
        method: 'PUT',
        data: {
          firstName,
          lastName,
          phone,
          salesRepresntativeId,
          sourceName,
          userInterests: interests,
          gender,
          age,
          email,
          city,
        },
      });
      setEditingMode(false);
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);
      await privateAxios({ url: `/moderator/delete-customer/${customer.id}`, method: 'Delete' });
      navigate('/all-customers');
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <div className="flex animate-fade-in-fast flex-col gap-2">
      <Form onSubmit={handleSubmit} submitLabel="Update" loading={loading} error={error}>
        <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <InputField.Phone value={phone} onChange={(e) => setPhone(e.target.value)} />
        <InputField.Age value={age || ''} onChange={(e) => setAge(e.target.value)} />
        <InputField.Email value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        <InputField.City value={city || ''} onChange={(e) => setCity(e.target.value)} />
        {/* sales representative - source - Interests - gender */}
      </Form>
      <div className="flex gap-2">
        <button
          className="w-full rounded-xl bg-gray-50 py-2 text-gray-500 transition-colors hover:bg-gray-100"
          onClick={() => setEditingMode(false)}
        >
          Cancel
        </button>
        <button
          className="w-full rounded-xl bg-red-50 py-2 text-red-500 transition-colors hover:bg-red-100"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default CustomerEditingMode;
