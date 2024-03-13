import { useEffect, useState } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import PopupBox from '../../components/global/PopupBox';
import Form from '../../components/global/Form';
import InputField from '../../components/global/InputField';
import DropdownMenu from '../global/DropdownMenu';
import { faPaperPlane, faPenClip, faUser } from '@fortawesome/free-solid-svg-icons';

function AddNewCustomerPopup({ closePopup }) {
  const privateAxios = usePrivateAxios();

  // Required fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [salesRepresntativeId, setSalesRepresntativeId] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [interests, setInterests] = useState([]);

  // Optional fields
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState(undefined);
  const [gender, setGender] = useState(0);

  // Options
  const [salesRepresentativesOptions, setSalesRepresentativesOptions] = useState([]);
  const [sourcesOptions, setSourcesOptions] = useState([]);
  const [interestsOptions, setInterestsOptions] = useState([]);

  useEffect(() => {
    async function getAllSalesOptions() {
      try {
        const res = await privateAxios({ url: '/moderator/get-all-sales' });
        setSalesRepresentativesOptions(res.data.map((rep) => ({ value: rep.userId, label: rep.name })));
      } catch (error) {
        console.dir(error);
      }
    }
    getAllSalesOptions();
  }, [privateAxios]);

  useEffect(() => {
    async function getAllSourcesOptions() {
      try {
        const res = await privateAxios({ url: '/shared/get-all-sources' });
        setSourcesOptions(res.data.map((rep) => ({ value: rep.sourceName, label: rep.sourceName })));
      } catch (error) {
        console.dir(error);
      }
    }
    getAllSourcesOptions();
  }, [privateAxios]);

  useEffect(() => {
    async function getAllInterestsOptions() {
      try {
        const res = await privateAxios({ url: '/shared/get-all-interests' });
        setInterestsOptions(res.data.map((interest) => ({ value: interest.interestName })));
      } catch (error) {
        console.dir(error);
      }
    }
    getAllInterestsOptions();
  }, [privateAxios]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      firstName,
      lastName,
      phone,
      salesRepresntativeId,
      sourceName,
      interests,
      email,
      city,
      age,
      gender,
    });
  }

  return (
    <PopupBox title="Add new customer" closePopup={closePopup}>
      <Form onSubmit={handleSubmit} submitLabel="Add" className="h-auto flex-1 overflow-auto p-5">
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-progray-200">Required Information</legend>
          <div className="flex gap-3">
            <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoFocus />
            <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <InputField.Phone value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <DropdownMenu
            icon={faPenClip}
            placeholder="Assign to"
            value={salesRepresntativeId}
            setValue={setSalesRepresntativeId}
            options={salesRepresentativesOptions}
            search
            required
          />
          <DropdownMenu
            icon={faPaperPlane}
            placeholder="Source"
            value={sourceName}
            setValue={setSourceName}
            options={sourcesOptions}
            search
            required
          />
          <InterestsField interestsOptions={interestsOptions} interests={interests} setInterests={setInterests} />
        </fieldset>
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-progray-200">Optional Information</legend>
          <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField.City value={city} onChange={(e) => setCity(e.target.value)} />
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
        </fieldset>
      </Form>
    </PopupBox>
  );
}

export default AddNewCustomerPopup;

function InterestsField({ interestsOptions, interests, setInterests }) {
  return (
    <fieldset className="max-h-48 overflow-auto bg-progray-50 p-2">
      <legend className="text-progray-200">Interests</legend>
      <div className="flex flex-col">
        {interestsOptions.map((interest) => (
          <InterestCheckbox key={interest.value} value={interest.value} interests={interests} setInterests={setInterests} />
        ))}
      </div>
    </fieldset>
  );
}

function InterestCheckbox({ value, interests, setInterests }) {
  return (
    <div className="w-full px-4 hover:bg-pro-100">
      <label className="flex h-10 cursor-pointer items-center gap-1 text-progray-300">
        <input
          type="checkbox"
          value={value}
          checked={interests.includes(value)}
          onChange={(e) => {
            if (e.target.checked) setInterests([...interests, value]);
            else setInterests(interests.filter((interest) => interest !== value));
          }}
        />
        {value}
      </label>
    </div>
  );
}
