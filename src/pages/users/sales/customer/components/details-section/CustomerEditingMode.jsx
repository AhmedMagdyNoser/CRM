import { useState } from 'react';
import { globalErrorMessage } from '../../../../../../utils/utils';
import { validateCustomerFields } from '../../../../../../utils/validation';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import InputField from '../../../../../../components/ui/InputField';
import Form from '../../../../../../components/ui/Form';

// Task: This page needs to be refactored with the new data structure

function CustomerEditingMode({ customer, setEditingMode }) {
  const privateAxios = usePrivateAxios();

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
      console.log(error);
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
      <button className="btn-light w-full py-2" onClick={() => setEditingMode(false)}>
        Cancel
      </button>
    </div>
  );
}

export default CustomerEditingMode;
