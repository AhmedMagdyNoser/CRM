import { useEffect } from 'react';

function AddNewCustomer() {
  useEffect(() => {
    document.title = 'Add New Customer';
    return () => (document.title = 'Pro Sales');
  }, []);

  return (
    <div>
      <h1>Add New Customer</h1>
    </div>
  );
}

export default AddNewCustomer;
