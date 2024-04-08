import { useState } from 'react';
import { globalErrorMessage, paths, roles } from '../../../../../../utils/utils';
import { validateCustomerFields } from '../../../../../../utils/validation';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import InputField from '../../../../../../components/ui/InputField';
import Form from '../../../../../../components/ui/Form';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import DropdownMenu from '../../../../../../components/ui/DropdownMenu';
import icons from '../../../../../../utils/faIcons';
import useOnLoadFetch from '../../../../../../hooks/useOnLoadFetch';
import AddNewSourcePopup from '../../../../moderator/add-new-customer/components/AddNewSourcePopup';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InterestsInputField from '../../../../../../components/interests/InterestsInputFields';
import GenderInput from '../../../../../../components/ui/GenderInput';

function CustomerEditingMode({ customer, setCustomer, setEditingMode }) {
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();

  // Required fields
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [phone, setPhone] = useState(customer.phone);
  const [salesRepresentativeId, setSalesRepresentativeId] = useState(customer.salesRepresentative.id);
  const [source, setSource] = useState(customer.source);
  const [interests, setInterests] = useState(customer.interests);

  // Optional fields
  const [gender, setGender] = useState(customer.gender);
  const [age, setAge] = useState(customer.age);
  const [email, setEmail] = useState(customer.email);
  const [city, setCity] = useState(customer.city);

  // Options
  const { data: salesOptions, loading: salesOptionsLoading } = useOnLoadFetch('/moderator/get-all-sales');
  const {
    data: sourcesOptions,
    setData: setSourcesOptions,
    loading: sourcesOptionsLoading,
  } = useOnLoadFetch('/shared/get-all-sources');
  const { data: interestsOptions, loading: interestsOptionsLoading } = useOnLoadFetch('/shared/get-all-interests');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newSourcePopup, setNewSourcePopup] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError('');
      const data = {
        firstName,
        lastName,
        phone,
        salesRepresntativeId: salesRepresentativeId, // typo in salesRepresntativeId
        source,
        interests,
      };

      if (!validateCustomerFields(data, setError)) return;

      if (age) data.age = age;
      if (gender) data.gender = gender;
      if (email) data.email = email;
      if (city) data.city = city;

      setLoading(true);
      await privateAxios({
        url: `/moderator/update-customer?CustomerId=${customer.id}`,
        method: 'PUT',
        data,
      });
      setCustomer({
        ...customer,
        ...data,
        salesRepresentative: salesOptions.find((user) => user.id === salesRepresentativeId),
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
      navigate(`/${paths.customers}`);
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <div className="flex animate-fade-in-fast flex-col gap-2">
      <Form onSubmit={handleSubmit} submitLabel="Update" loading={loading} error={error}>
        {/* Required fields */}
        <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <InputField.Phone value={phone} onChange={(e) => setPhone(e.target.value)} />
        <DropdownMenu
          icon={icons.assign}
          placeholder="Assign to"
          defaultQuery={`${customer.salesRepresentative.firstName} ${customer.salesRepresentative.lastName}`}
          selected={salesRepresentativeId}
          setSelected={setSalesRepresentativeId}
          loading={salesOptionsLoading}
          options={salesOptions
            .filter((user) => !user.roles.includes(roles.manager))
            .map((user) => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))}
          searchable
        />
        <div className="flex w-full gap-3">
          <DropdownMenu
            placeholder="Source"
            options={sourcesOptions.map((source) => ({ value: source.name, label: source.name }))} // Task: Change the data structure
            setOptions={setSourcesOptions}
            selected={source}
            defaultQuery={source}
            setSelected={setSource}
            searchable
            icon={icons.source}
            loading={sourcesOptionsLoading}
          />
          <button
            type="button"
            onClick={() => setNewSourcePopup(true)}
            className="flex-center rounded-xl bg-gray-100 px-5 text-xl text-gray-500 transition-colors hover:bg-gray-200"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          {newSourcePopup && (
            <AddNewSourcePopup setNewSourcePopup={setNewSourcePopup} setSourcesOptions={setSourcesOptions} />
          )}
        </div>
        <InterestsInputField
          interestsOptions={interestsOptions}
          selectedInterests={interests}
          setSelectedInterests={setInterests}
          loading={interestsOptionsLoading}
        />

        {/* Optional fields */}
        <GenderInput gender={gender || 0} setGender={setGender} className="h-12" />
        <InputField.Age value={age || ''} onChange={(e) => setAge(e.target.value)} />
        <InputField.Email value={email || ''} onChange={(e) => setEmail(e.target.value)} />
        <InputField.City value={city || ''} onChange={(e) => setCity(e.target.value)} />
      </Form>
      <div className="flex gap-2">
        <button
          className="w-full rounded-xl bg-gray-50 py-2 text-gray-500 transition-colors hover:bg-gray-100"
          onClick={() => setEditingMode(false)}
        >
          Cancel
        </button>
        {/* <button
          className="w-full rounded-xl bg-red-50 py-2 text-red-500 transition-colors hover:bg-red-100"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
          Delete
        </button> */}
      </div>
    </div>
  );
}

export default CustomerEditingMode;
