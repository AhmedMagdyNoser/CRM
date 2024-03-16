import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../hooks/useOnLoadFetch';
import CustomerFullCard from '../../../components/sales/CustomerFullCard';
import ErrorAlert from '../../../components/global/ErrorAlert';

function Customer() {
  useDocumentTitle('Customer Details');

  const params = useParams();

  const { data, loading, error } = useOnLoadFetch(`/moderator/get-customer/${params.id}`);

  return error ? <ErrorAlert message={error} /> : <CustomerFullCard customer={data} loading={loading} />;
}

export default Customer;
