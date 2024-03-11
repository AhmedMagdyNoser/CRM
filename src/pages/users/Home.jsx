import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Form from '../../components/global/Form';
import InputField from '../../components/global/InputField';
import PopupBox from '../../components/global/PopupBox';
import SelectMenu from '../../components/global/SelectMenu';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const { auth } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <section>
      <h1>Home</h1>
      <p className="my-2">Hello {auth.firstName}! Welcome to your dashboard.</p>
      <button className="btn-primary px-5 py-3 text-sm" onClick={() => setShowPopup(true)}>
        New Customer
      </button>
      {showPopup && <NewCustomerPopup closePopup={() => setShowPopup(false)} />}
    </section>
  );
}

export default Home;

function NewCustomerPopup({ closePopup }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [gender, setGender] = useState(undefined);

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      firstName,
      lastName,
      phone,
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
