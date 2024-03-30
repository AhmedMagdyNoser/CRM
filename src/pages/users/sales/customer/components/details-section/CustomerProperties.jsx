import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../../../../../utils/faIcons';
import InterestBadge from '../../../../../../components/global/InterestBadge';

// Task: Need to be refactored with the new data structure

function CustomerProperties({ customer }) {
  console.log(customer);
  return (
    <>
      <Property icon={icons.phone} title="Phone" value={customer.phone} />
      <Property icon={icons.email} title="Email" value={customer.email || 'N/A'} />
      <Property icon={icons.age} title="Age" value={customer.age || 'N/A'} />
      <Property
        icon={icons.gender}
        title="Gender"
        value={customer.gender === 0 ? 'N/A' : customer.gender === 1 ? 'Male' : customer.genter === 2 ? 'Female' : null}
      />
      <Property icon={icons.city} title="City" value={customer.city || 'N/A'} />
      <Property
        icon={icons.assign}
        title="Sales Representative"
        value={`${customer.salesRepresntative.firstName} ${customer.salesRepresntative.lastName}`}
      />
      <Property icon={icons.source} title="Source" value={customer.source} />
      <Property icon={icons.date} title="Added On" value={new Date(customer.additionDate).toLocaleDateString()} />
      {/* Task: formatDate */}
      <div className="mt-5 font-medium text-gray-800">Interests</div>
      <div className="flex flex-wrap gap-2">
        {customer.interests.map((interest) => (
          <InterestBadge key={interest.id} interest={interest.name} />
        ))}
      </div>
      {/* Task: Add last action */}
      <div className="mt-5 font-medium text-gray-800">Last Action</div>
      <div className="rounded-xl bg-gray-100 p-3">
        <div className="flex justify-between">
          <p className="text-nowrap text-gray-800">
            {customer.lastAction?.type ? customer.lastAction.type.toUpperCase() : 'N/A'}
          </p>
          <p className="text-nowrap text-gray-800">
            {customer.lastAction?.date ? new Date(customer.lastAction.date).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>
    </>
  );
}

export default CustomerProperties;

function Property({ icon, title, value }) {
  return (
    <div className="flex justify-between">
      <div className="space-x-2">
        <FontAwesomeIcon icon={icon} className="text-pro-200" />
        <span className="text-nowrap text-gray-500">{title}</span>
      </div>
      <p className="text-nowrap text-gray-800">{value}</p>
    </div>
  );
}
