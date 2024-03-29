import useDocumentTitle from '../../../../hooks/useDocumentTitle';

function AssignedCustomers() {
  useDocumentTitle('Assigned Customers');
  return <h1>Customers assigned to me</h1>;
}

export default AssignedCustomers;
