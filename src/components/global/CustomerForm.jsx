import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useOnLoadFetch from '../../hooks/useOnLoadFetch';
import AddNewSourcePopup from '../../pages/users/moderator/add-new-customer/components/AddNewSourcePopup';
import InterestsInputField from '../interests/InterestsInputFields';
import DropdownMenu from '../ui/DropdownMenu';
import Form from '../ui/Form';
import InputField from '../ui/InputField';
import GenderInput from '../ui/GenderInput';
import { useState } from 'react';
import icons from '../../utils/faIcons';
import { globalErrorMessage, paths, roles } from '../../utils/utils';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import { useNavigate } from 'react-router-dom';

function CustomerForm({ title, submitLabel, newCustomer, customer, setCustomer, setEditingMode, className }) {
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();

  const {
    // Required fields
    id, // In case of editing
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    salesRepresentativeId,
    setSalesRepresentativeId,
    salesRepresentativeName, // In case of editing
    sourceId,
    setSourceId,
    sourceName, // In case of editing
    interests,
    setInterests,
    // Optional fields
    age,
    setAge,
    gender,
    setGender,
    email,
    setEmail,
    city,
    setCity,
  } = customer;

  const [openOptionalFields, setOpenOptionalFields] = useState(false);
  const [newSourcePopup, setNewSourcePopup] = useState(false);

  const {
    data: sourcesOptions,
    loading: sourcesOptionsLoading,
    setData: setSourcesOptions,
  } = useOnLoadFetch('/shared/get-all-sources');
  const { data: salesOptions, loading: salesOptionsLoading } = useOnLoadFetch('/moderator/get-all-sales');
  const { data: interestsOptions, loading: interestsOptionsLoading } = useOnLoadFetch('/shared/get-all-interests');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError('');

      // Required Fields
      const data = {
        firstName,
        lastName,
        phone,
        salesRepresentativeId,
        sourceId,
        interests,
      };

      // Validation
      if (!firstName) {
        setError('Please provide a first name');
        return;
      } else if (!lastName) {
        setError('Please provide a last name');
        return;
      } else if (!phone) {
        setError('Please provide a phone number');
        return;
      } else if (!salesRepresentativeId) {
        setError('Please assign this customer to a sales representative');
        return;
      } else if (!sourceId) {
        setError('Please select the source of this customer');
        return;
      } else if (interests.length === 0) {
        setError('Please select at least one interest');
        return;
      }

      // Adding Optional Field If Provided
      if (age) data.age = age;
      if (gender) data.gender = gender;
      if (email) data.email = email;
      if (city) data.city = city;

      setLoading(true);

      if (newCustomer) {
        const res = await privateAxios({
          url: '/moderator/add-customer',
          method: 'post',
          data,
        });
        navigate(`/${paths.customers}/${res.data.id}`);
      } else {
        const res = await privateAxios({
          url: `/moderator/update-customer?CustomerId=${id}`,
          method: 'PUT',
          data,
        });
        setCustomer(res.data);
        setEditingMode(false);
      }
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <Form onSubmit={handleSubmit} loading={loading} error={error} submitLabel={submitLabel} className={`${className}`}>
      {title && <h1>{title}</h1>}

      {/* Required Information Fieldset */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 text-gray-500">Required information</legend>
        <div className={`flex flex-col gap-3 ${newCustomer ? 'md:flex-row' : ''}`}>
          <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
          <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <InputField.Phone value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className={`flex flex-col gap-3 ${newCustomer ? 'md:flex-row' : ''}`}>
          <DropdownMenu
            icon={icons.assign}
            placeholder="Assign to"
            options={salesOptions
              .filter((user) => !user.roles.includes(roles.manager))
              .map((user) => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))}
            loadingOptions={salesOptionsLoading}
            selected={salesRepresentativeId}
            setSelected={setSalesRepresentativeId}
            defaultQuery={salesRepresentativeName || ''}
          />
          <div className="flex w-full gap-3">
            <DropdownMenu
              icon={icons.source}
              placeholder="Source"
              options={sourcesOptions.map((source) => ({ value: source.id, label: source.name }))}
              setOptions={setSourcesOptions}
              loadingOptions={sourcesOptionsLoading}
              selected={sourceId}
              setSelected={setSourceId}
              defaultQuery={sourceName || ''}
            />
            {newSourcePopup && (
              <AddNewSourcePopup setNewSourcePopup={setNewSourcePopup} setSourcesOptions={setSourcesOptions} />
            )}
            <button
              type="button"
              onClick={() => setNewSourcePopup(true)}
              className="flex-center rounded-xl bg-gray-100 px-5 text-xl text-gray-500 transition-colors hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={icons.plus} />
            </button>
          </div>
        </div>
        <InterestsInputField
          interestsOptions={interestsOptions}
          selectedInterests={interests}
          setSelectedInterests={setInterests}
          loading={interestsOptionsLoading}
        />
      </fieldset>

      <fieldset>
        <legend
          tabIndex={0}
          className="cursor-pointer text-gray-500 hover:underline"
          onClick={() => setOpenOptionalFields(!openOptionalFields)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setOpenOptionalFields(!openOptionalFields);
            }
          }}
        >
          More Details (Optional)
        </legend>
        {openOptionalFields && (
          <div className="mt-2 flex animate-fade-in-medium flex-col gap-3">
            <div className={`flex flex-col gap-3 ${newCustomer ? 'md:flex-row' : ''}`}>
              <GenderInput gender={gender} setGender={setGender} className={`h-12 ${newCustomer ? 'md:h-auto' : ''}`} />
              <InputField.Age value={age || ''} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className={`flex flex-col gap-3 ${newCustomer ? 'md:flex-row' : ''}`}>
              <InputField.Email value={email || ''} onChange={(e) => setEmail(e.target.value)} />
              <InputField.City value={city || ''} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
        )}
      </fieldset>
    </Form>
  );
}

export default CustomerForm;
