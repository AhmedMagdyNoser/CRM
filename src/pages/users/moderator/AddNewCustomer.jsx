import { useEffect, useState } from 'react';
import Form from '../../../components/global/Form';
import InputField from '../../../components/global/InputField';
import DropdownMenu from '../../../components/global/DropdownMenu';
import { faPaperPlane, faPenClip, faUser } from '@fortawesome/free-solid-svg-icons';
import usePrivateAxios from '../../../hooks/usePrivateAxios';
import { useNavigate } from 'react-router-dom';
import { globalErrorMessage } from '../../../utils/utils';
import InterestsInputField from '../../../components/global/InterestsInputFields';

function AddNewCustomer() {
  const privateAxios = usePrivateAxios();
  const navigate = useNavigate();

  // Required fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [salesRepresntativeId, setSalesRepresntativeId] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [interests, setInterests] = useState([]);

  // Optional fields
  const [email, setEmail] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [gender, setGender] = useState(0);

  // Options
  const [salesRepresentativesOptions, setSalesRepresentativesOptions] = useState([]);
  const [salesRepresentativesOptionsLoading, setSalesRepresentativesOptionsLoading] = useState(true);
  const [sourcesOptions, setSourcesOptions] = useState([]);
  const [sourcesOptionsLoading, setSourcesOptionsLoading] = useState(true);
  const [interestsOptions, setInterestsOptions] = useState([]);
  const [interestsOptionsLoading, setInterestsOptionsLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [openOptionalFields, setOpenOptionalFields] = useState(false);

  useEffect(() => {
    document.title = 'Add New Customer';
    return () => (document.title = 'Pro Sales');
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let canceled = false;

    (async function getAllSalesRepresentativesOptions() {
      try {
        const { data } = await privateAxios({ url: '/moderator/get-all-sales' });
        if (!canceled) setSalesRepresentativesOptions(data.map((rep) => ({ value: rep.userId, label: rep.name })));
      } catch (error) {
        if (!canceled) console.dir(error);
      } finally {
        if (!canceled) setSalesRepresentativesOptionsLoading(false);
      }
    })();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [privateAxios]);

  useEffect(() => {
    let controller = new AbortController();
    let canceled = false;

    (async function getAllSourcesOptions() {
      try {
        const { data } = await privateAxios({ url: '/shared/get-all-sources' });
        if (!canceled) setSourcesOptions(data.map((rep) => ({ value: rep.sourceName, label: rep.sourceName })));
      } catch (error) {
        if (!canceled) console.dir(error);
      } finally {
        if (!canceled) setSourcesOptionsLoading(false);
      }
    })();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [privateAxios]);

  useEffect(() => {
    let controller = new AbortController();
    let canceled = false;

    async function getAllInterestsOptions() {
      try {
        const { data } = await privateAxios({ url: '/shared/get-all-interests' });
        if (!canceled) setInterestsOptions(data.map((interest) => ({ value: interest.interestName })));
      } catch (error) {
        if (!canceled) console.dir(error);
      } finally {
        if (!canceled) setInterestsOptionsLoading(false);
      }
    }
    getAllInterestsOptions();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [privateAxios]);

  function validateInputs() {
    if (!firstName) {
      setError('First name is required');
    } else if (!lastName) {
      setError('Last name is required');
    } else if (!phone) {
      setError('Phone is required');
    } else if (!salesRepresntativeId) {
      setError('Please assign this customer to a sales representative');
    } else if (!sourceName) {
      setError('Please select the source of this customer');
    } else if (interests.length === 0) {
      setError('Please select at least one interest');
    } else {
      return true;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError('');
      if (!validateInputs()) return;
      setLoading(true);
      await privateAxios({
        url: '/moderator/add-customer',
        method: 'post',
        data: {
          firstName,
          lastName,
          phone,
          salesRepresntativeId,
          sourceName,
          interests,
          email,
          city,
          age,
        },
      });
      navigate('/'); // Task: Navigate to the customer page
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <div className="flex-center h-full">
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Add"
        className="h-full w-full overflow-auto md:h-fit md:w-[650px] md:border md:p-8 md:shadow-xl lg:w-[800px]"
      >
        <h1>Add New Customer</h1>

        {/* Required Information Fieldset */}
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-progray-200">Required information</legend>
          <div className="flex gap-3">
            <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
            <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <InputField.Phone value={phone} onChange={(e) => setPhone(e.target.value)} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <DropdownMenu
              icon={faPenClip}
              placeholder="Assign to"
              value={salesRepresntativeId}
              setValue={setSalesRepresntativeId}
              loading={salesRepresentativesOptionsLoading}
              options={salesRepresentativesOptions}
              search
            />
            <DropdownMenu
              icon={faPaperPlane}
              placeholder="Source"
              value={sourceName}
              setValue={setSourceName}
              loading={sourcesOptionsLoading}
              options={sourcesOptions}
              search
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
            className="cursor-pointer text-progray-200 hover:underline"
            onClick={() => setOpenOptionalFields(!openOptionalFields)}
          >
            Optional Information
          </legend>
          {openOptionalFields && (
            <div className="mt-2 flex animate-fade-in-medium flex-col gap-3">
              <div className="flex gap-3">
                <InputField.Age value={age} onChange={(e) => setAge(e.target.value)} />
                <DropdownMenu
                  icon={faUser}
                  placeholder="Gender"
                  value={gender}
                  setValue={setGender}
                  options={[
                    { value: 0, label: 'Male' },
                    { value: 1, label: 'Female' },
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
