import { useState } from 'react';
import CustomerForm from '../../../../../../components/customer/CustomerForm';

function CustomerEditingMode({ customer, setCustomer, setEditingMode }) {
  // Required fields
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);
  const [phone, setPhone] = useState(customer.phone);
  const [salesRepresentativeId, setSalesRepresentativeId] = useState(customer.salesRepresentative.id);
  const [sourceId, setSourceId] = useState(customer.source.id);
  const [interests, setInterests] = useState(customer.interests);

  // Optional fields
  const [gender, setGender] = useState(customer.gender);
  const [age, setAge] = useState(customer.age);
  const [email, setEmail] = useState(customer.email);
  const [city, setCity] = useState(customer.city);

  return (
    <div className="flex animate-fade-in-fast flex-col gap-2">
      <CustomerForm
        submitLabel="Update"
        setEditingMode={setEditingMode}
        setCustomer={setCustomer}
        customer={{
          // Required fields
          id: customer.id,
          firstName,
          setFirstName,
          lastName,
          setLastName,
          phone,
          setPhone,
          salesRepresentativeId,
          setSalesRepresentativeId,
          salesRepresentativeName: `${customer.salesRepresentative.firstName} ${customer.salesRepresentative.lastName}`,
          sourceId,
          setSourceId,
          sourceName: customer.source.name,
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
        }}
      />
      <div className="flex gap-2">
        <button
          className="w-full rounded-xl border bg-gray-50 py-2 text-gray-500 transition-colors hover:bg-gray-100"
          onClick={() => setEditingMode(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CustomerEditingMode;
