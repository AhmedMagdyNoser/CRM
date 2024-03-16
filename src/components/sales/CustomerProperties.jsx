import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icons } from '../../utils/utils';
import InterestBadge from '../global/InterestBadge';

function CustomerProperties({ customer }) {
  return (
    <div className="flex w-full flex-col gap-2 px-10 py-5">
      <Property icon={icons.user} title="Name" value={`${customer.firstName} ${customer.lastName}`} />
      <Property icon={icons.phone} title="Phone" value={customer.phone} />
      <Property icon={icons.email} title="Email" value={customer.email || 'N/A'} />
      <Property icon={icons.age} title="Age" value={customer.age || 'N/A'} />
      <Property
        icon={icons.gender}
        title="Gender"
        value={customer.gender === 0 ? 'N/A' : customer.gender === 1 ? 'Male' : customer.genter === 2 ? 'Female' : null}
      />
      <Property icon={icons.city} title="City" value={customer.city || 'N/A'} />
      <Property icon={icons.assign} title="Sales Representative" /> {/* Task: value={customer.salesRepName} */}
      <Property icon={icons.source} title="Source" value={customer.sourceName} />
      <Property icon={icons.date} title="Added On" value={new Date(customer.addedOn).toLocaleDateString()} />
      <div className="mt-5 font-medium text-progray-300">Interests</div>
      <div className="flex flex-wrap gap-2">
        {customer.userInterests.map(
          (interest) => interest.isSelected && <InterestBadge key={interest.name} interest={interest.name} />,
        )}
      </div>
    </div>
  );
}

export default CustomerProperties;

function Property({ icon, title, value }) {
  return (
    <div className="flex justify-between">
      <div className="space-x-2">
        <FontAwesomeIcon icon={icon} className="text-pro-200" />
        <span className="text-nowrap text-progray-200">{title}</span>
      </div>
      <p className="text-nowrap text-progray-300">{value}</p>
    </div>
  );
}
