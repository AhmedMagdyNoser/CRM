import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../hooks/useOnLoadFetch';
import CustomerFullCard from '../../../components/sales/CustomerFullCard';

function Customer() {
  useDocumentTitle('Customer Details');

  const params = useParams();

  const { data, loading } = useOnLoadFetch(`/moderator/get-customer/${params.id}`);

  return (
    <CustomerFullCard customer={data} loading={loading} />
  );
}

export default Customer;



