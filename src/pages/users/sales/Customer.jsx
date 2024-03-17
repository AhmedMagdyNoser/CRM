import { useParams } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useOnLoadFetch from '../../../hooks/useOnLoadFetch';
import CustomerFullCard from '../../../components/sales/CustomerFullCard';
import ErrorAlert from '../../../components/global/ErrorAlert';
import CustomerActions from '../../../components/sales/CustomerActions';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../hooks/useAuth';
import { roles } from '../../../utils/utils';

const testActions = [
  {
    id: 1,
    type: 'call',
    status: 1,
    summary: 'Left voicemail regarding upcoming webinar',
    date: '2024-03-15T10:15:00',
    followUp: '2024-03-18T14:00:00',
  },
  {
    id: 2,
    type: 'message',
    summary: 'Asked for pricing details on software upgrade.',
    date: '2024-03-15T12:30:00',
    followUp: null,
  },
  {
    id: 3,
    type: 'meeting',
    online: true,
    summary: 'Demoed new features of CRM system',
    date: '2024-03-15T14:00:00',
    followUp: null,
  },
  {
    id: 4,
    type: 'deal',
    price: 1500,
    interest: { id: 123, name: 'Marketing Automation Software' },
    summary: 'Agreed to purchase marketing software package',
    date: '2024-03-15T16:45:00',
    followUp: null,
  },
  {
    id: 5,
    type: 'call',
    status: 0,
    summary: 'Scheduled follow-up call for next week',
    date: '2024-03-16T09:30:00',
    followUp: '2024-03-23T10:00:00',
  },
  {
    id: 6,
    type: 'message',
    summary: 'Sent email inquiry about new features',
    date: '2024-03-16T13:20:00',
    followUp: '2024-03-17T15:00:00',
  },
  {
    id: 7,
    type: 'meeting',
    online: true,
    summary: 'Presented product roadmap to potential investor',
    date: '2024-03-16T15:00:00',
    followUp: '2024-03-18T11:30:00',
  },
  {
    id: 8,
    type: 'deal',
    price: 3200,
    interest: { id: 789, name: 'E-commerce Platform' },
    summary: 'Negotiated discount on e-commerce platform subscription',
    date: '2024-03-16T17:00:00',
    followUp: null,
  },
  {
    id: 9,
    type: 'call',
    status: 2,
    summary: 'Resolved technical issue reported by customer',
    date: '2024-03-17T10:45:00',
    followUp: null,
  },
  {
    id: 10,
    type: 'message',
    summary: 'Followed up with customer regarding feedback',
    date: '2024-03-17T13:15:00',
    followUp: '2024-03-18T14:30:00',
  },
];

function Customer() {
  useDocumentTitle('Customer Details');

  const { auth } = useAuth();
  const params = useParams();
  const [editingMode, setEditingMode] = useState(false);

  const { data, loading, error } = useOnLoadFetch(`/moderator/get-customer/${params.id}`);

  return error ? (
    <ErrorAlert message={error} />
  ) : (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1>Customer Details</h1>
        {auth.roles.includes(roles.moderator) && (
          <button
            onClick={() => setEditingMode(!editingMode)}
            className={`btn-primary flex-center animate-fade-in-medium gap-1 px-4 py-2 text-sm sm:text-base font-semibold`}
          >
            <FontAwesomeIcon icon={faEdit} />
            {editingMode ? 'Cancel Editing' : 'Edit'}
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-wrap gap-5">
        <CustomerFullCard customer={data} loading={loading} editingMode={editingMode} setEditingMode={setEditingMode} />
        <CustomerActions actions={testActions} />
      </div>
    </div>
  );
}

export default Customer;
