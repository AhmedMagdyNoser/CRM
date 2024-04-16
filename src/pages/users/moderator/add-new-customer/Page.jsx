import { useState } from 'react';
import { breakboints } from '../../../../utils/utils';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import CustomerForm from '../../../../components/global/CustomerForm';

function AddNewCustomer() {
  useDocumentTitle('Add New Customer');

  // Required fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [salesRepresentativeId, setSalesRepresentativeId] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [interests, setInterests] = useState([]);

  // Optional fields
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  return (
    <div className="flex-center h-full animate-fade-in-fast">
      <CustomerForm
        className="form-shadow h-full w-full overflow-auto rounded-xl md:h-fit md:w-[650px] md:border md:p-8 lg:w-[800px]"
        title="Add New Customer"
        submitLabel="Add"
        newCustomer
        customer={{
          // Required fields
          firstName,
          setFirstName,
          lastName,
          setLastName,
          phone,
          setPhone,
          salesRepresentativeId,
          setSalesRepresentativeId,
          sourceId,
          setSourceId,
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
