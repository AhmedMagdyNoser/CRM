import { useState } from 'react';
import Action from './Action';

const tabs = [
  { title: 'All' },
  { title: 'Calls', type: 'call' },
  { title: 'Messages', type: 'message' },
  { title: 'Meetings', type: 'meeting' },
  { title: 'Deals', type: 'deal' },
];

// Task: This component needs to be refactored to allow adding new actions

function ActionsSection({ actions }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  function filterActions(tab) {
    if (tab.title === 'All') return actions;
    else return actions.filter((action) => action.type.toLowerCase() === tab.type.toLowerCase());
  }

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

export default ActionsSection;

function ActionsTab({ tab, isActive, onClick }) {
  return (
    <button
      className={`w-full text-nowrap rounded-none border-b-4 p-3 text-center font-medium transition-colors ${isActive ? 'border-pro-300 text-pro-300' : 'border-gray-50 text-gray-500'} hover:text-pro-300`}
      onClick={onClick}
    >
      {tab.title}
    </button>
  );
}
