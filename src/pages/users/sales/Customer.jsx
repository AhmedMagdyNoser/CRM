import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../hooks/useOnLoadFetch';
import CustomerFullCard from '../../../components/sales/CustomerFullCard';
import ErrorAlert from '../../../components/global/ErrorAlert';
import CustomerActions from '../../../components/sales/CustomerActions';

function Customer() {
  useDocumentTitle('Customer Details');

  const params = useParams();

  const { data, loading, error } = useOnLoadFetch(`/moderator/get-customer/${params.id}`);

  return error ? (
    <ErrorAlert message={error} />
  ) : (
    <div className='flex min-h-full gap-5'>
      <CustomerFullCard customer={data} loading={loading} />
      <CustomerActions />
    </div>
  );
}

export default Customer;
