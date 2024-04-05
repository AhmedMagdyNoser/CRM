import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../../hooks/useOnLoadFetch';
import usePrivateAxios from '../../../../hooks/usePrivateAxios';
import Form from '../../../../components/ui/Form';
import InputField from '../../../../components/ui/InputField';
import DropdownMenu from '../../../../components/ui/DropdownMenu';
import InterestsInputField from '../../../../components/global/InterestsInputFields';
import { globalErrorMessage } from '../../../../utils/utils';
import { validateCustomerFields } from '../../../../utils/validation';
import icons from '../../../../utils/faIcons';

// Task: This page needs to be refactored

function AddNewCustomer() {
  useDocumentTitle('Add New Customer');

  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();

  // Required fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [salesRepresntativeId, setSalesRepresntativeId] = useState('');
  const [source, setSource] = useState('');
  const [interests, setInterests] = useState([]);

  // Optional fields
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  // Options
  const { data: salesOptions, loading: salesOptionsLoading } = useOnLoadFetch('/moderator/get-all-sales');
  const { data: sourcesOptions, loading: sourcesOptionsLoading } = useOnLoadFetch('/shared/get-all-sources');
  const { data: interestsOptions, loading: interestsOptionsLoading } = useOnLoadFetch('/shared/get-all-interests');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [openOptionalFields, setOpenOptionalFields] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError('');
      const data = {
        firstName,
        lastName,
        phone,
        salesRepresntativeId,
        source,
        interests,
      };

      if (!validateCustomerFields(data, setError)) return;

      if (age) data.age = age;
      if (gender) data.gender = gender;
      if (email) data.email = email;
      if (city) data.city = city;

      setLoading(true);
      const res = await privateAxios({
        url: '/moderator/add-customer',
        method: 'post',
        data,
      });
      navigate(`/customer/${res.data.id}`);
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <div className="flex-center h-full animate-fade-in-fast">
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Add"
        className="h-full w-full overflow-auto rounded-xl md:h-fit md:w-[650px] md:border md:p-8 md:shadow-md lg:w-[800px]"
      >
        <h1>Add New Customer</h1>

        {/* Required Information Fieldset */}
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-gray-500">Required information</legend>
          <div className="flex flex-col gap-3 md:flex-row">
            <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
            <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <InputField.Phone value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <DropdownMenu
              icon={icons.assign}
              placeholder="Assign to"
              selected={salesRepresntativeId}
              setSelected={setSalesRepresntativeId}
              loading={salesOptionsLoading}
              options={salesOptions.map((sales) => ({ value: sales.id, label: `${sales.firstName} ${sales.lastName}` }))}
              searchable
            />
            <DropdownMenu
              icon={icons.source}
              placeholder="Source"
              selected={source}
              setSelected={setSource}
              loading={sourcesOptionsLoading}
              options={sourcesOptions.map((source) => ({ value: source.name, label: source.name }))} // Task: Change the data structure
              searchable
            />
          </div>
          <InterestsInputField
            interestsOptions={interestsOptions}
            interests={interests}
            setInterests={setInterests}
            loading={interestsOptionsLoading}
          />
        </fieldset>

        {/* Optional Information Fieldset */}
        <fieldset>
          <legend
            className="cursor-pointer text-gray-500 hover:underline"
            onClick={() => setOpenOptionalFields(!openOptionalFields)}
          >
            More Details (Optional)
          </legend>
          {openOptionalFields && (
            <div className="mt-2 flex animate-fade-in-medium flex-col gap-3">
              <div className="flex gap-3">
                <InputField.Age value={age} onChange={(e) => setAge(e.target.value)} />
                <DropdownMenu
                  icon={icons.gender}
                  placeholder="Gender"
                  selected={gender}
                  setSelected={setGender}
                  options={[
                    { value: 1, label: 'Male' },
                    { value: 2, label: 'Female' },
                  ]}
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField.City value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            </div>
          )}
        </fieldset>
      </Form>
    </div>
  );
}

export default AddNewCustomer;
