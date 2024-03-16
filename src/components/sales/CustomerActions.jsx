import { useState } from 'react';
import Action from './Action';

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

const tabs = [
  { title: 'All' },
  { title: 'Calls', type: 'call' },
  { title: 'Messages', type: 'message' },
  { title: 'Meetings', type: 'meeting' },
  { title: 'Deals', type: 'deal' },
];

function filterActions(tab) {
  if (tab.title === 'All') return testActions;
  else return testActions.filter((action) => action.type.toLowerCase() === tab.type.toLowerCase());
}

function CustomerActions() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex-1">
      <nav className="flex justify-between rounded-b-none bg-gray-100 text-sm">
        {tabs.map((tab, index) => (
          <ActionsTab key={index} tab={tab} isActive={activeTab.title === tab.title} onClick={() => setActiveTab(tab)} />
        ))}
      </nav>
      <div className="py-5 md:px-5">
        {filterActions(activeTab).map((action) => (
          <Action key={action.id} action={action} />
        ))}
      </div>
    </div>
  );
}
export default CustomerActions;

function ActionsTab({ tab, isActive, onClick }) {
  return (
    <button
      className={`w-full text-nowrap rounded-none border-b-4 p-3 text-center font-medium transition-colors ${isActive ? 'border-pro-300 text-pro-300' : 'border-gray-50 text-progray-200'} hover:text-pro-300`}
      onClick={onClick}
    >
      {tab.title}
    </button>
  );
}
