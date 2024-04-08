import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../../hooks/useOnLoadFetch';
import usePrivateAxios from '../../../../hooks/usePrivateAxios';
import Form from '../../../../components/ui/Form';
import InputField from '../../../../components/ui/InputField';
import DropdownMenu from '../../../../components/ui/DropdownMenu';
import InterestsInputField from '../../../../components/interests/InterestsInputFields';
import { breakboints, globalErrorMessage, paths, roles } from '../../../../utils/utils';
import { validateCustomerFields } from '../../../../utils/validation';
import icons from '../../../../utils/faIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddNewSourcePopup from './components/AddNewSourcePopup';
import GenderInput from '../../../../components/ui/GenderInput';

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
  const {
    data: sourcesOptions,
    setData: setSourcesOptions,
    loading: sourcesOptionsLoading,
  } = useOnLoadFetch('/shared/get-all-sources');
  const { data: interestsOptions, loading: interestsOptionsLoading } = useOnLoadFetch('/shared/get-all-interests');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [openOptionalFields, setOpenOptionalFields] = useState(false);
  const [newSourcePopup, setNewSourcePopup] = useState(false);

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
      navigate(`/${paths.customers}/${res.data.id}`);
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
        className="form-shadow h-full w-full overflow-auto rounded-xl md:h-fit md:w-[650px] md:border md:p-8 lg:w-[800px]"
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
            className="cursor-pointer text-gray-500 hover:underline"
            onClick={() => setOpenOptionalFields(!openOptionalFields)}
          >
            More Details (Optional)
          </legend>
          {openOptionalFields && (
            <div className="mt-2 flex animate-fade-in-medium flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <GenderInput gender={gender} setGender={setGender} className="h-12 sm:h-auto" />
                <InputField.Age value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField.City value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
            </div>
          )}
        </fieldset>
      </Form>
      <style>
        {`
          @media (min-width: ${breakboints.md}) {
            .form-shadow {
              box-shadow: 0 0 100px 50px rgba(0, 0, 0, 0.05), 0 5px 10px 0 rgba(0, 0, 0, 0.1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default AddNewCustomer;
