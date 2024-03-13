import { useEffect, useState } from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import PopupBox from '../../components/global/PopupBox';
import Form from '../../components/global/Form';
import InputField from '../../components/global/InputField';
import SelectMenu from '../../components/global/SelectMenu';
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
  const [email, setEmail] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [gender, setGender] = useState(undefined);

  // Options
  const [salesRepresentativesOptions, setSalesRepresentativesOptions] = useState([]);
  const [sourcesOptions, setSourcesOptions] = useState([]);
  // const [interestsOptions, setInterestsOptions] = useState([]);

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

  // useEffect(() => {
  //   async function getAllInterestsOptions() {
  //     try {
  //       await privateAxios({ url: '/shared/get-all-interests' });
  //     } catch (error) {
  //       console.dir(error);
  //     }
  //   }
  //   getAllInterestsOptions();
  // }, [privateAxios]);

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
          <SelectMenu
            icon={faPenClip}
            placeholder="Assign to"
            value={salesRepresntativeId}
            setValue={setSalesRepresntativeId}
            options={salesRepresentativesOptions}
            search
            required
          />
          <SelectMenu
            icon={faPaperPlane}
            placeholder="Source"
            value={sourceName}
            setValue={setSourceName}
            options={sourcesOptions}
            search
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-progray-200">Optional Information</legend>
          <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField.City value={city} onChange={(e) => setCity(e.target.value)} />
          <div className="flex gap-3">
            <InputField.Age value={age} onChange={(e) => setAge(e.target.value)} />
            <SelectMenu
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