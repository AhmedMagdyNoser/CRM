import { useEffect, useState } from 'react';
import { customerActions as actions } from '../../testingStaticData';
import Action from './Action';
import ActionSkeleton from './ActionSkeleton';
import ActionsTab from './ActionTab';

const tabs = [
  { title: 'All' },
  { title: 'Calls', type: 'call' },
  { title: 'Messages', type: 'message' },
  { title: 'Meetings', type: 'meeting' },
  { title: 'Deals', type: 'deal' },
];

// Task: This component needs to be refactored to allow adding new actions

function ActionsSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function filterActions(tab) {
    if (tab.title === 'All') return actions;
    else return actions.filter((action) => action.type.toLowerCase() === tab.type.toLowerCase());
  }

  return (
    <div className="flex-1">
      <nav className="flex justify-between overflow-hidden rounded-t-xl bg-pro-50">
        {tabs.map((tab, index) => (
          <ActionsTab key={index} tab={tab} isActive={activeTab.title === tab.title} onClick={() => setActiveTab(tab)} />
        ))}
      </nav>
      <div className="py-5 md:px-5">
        {loading ? (
          <ActionSkeleton length={5} />
        ) : (
          filterActions(activeTab).map((action) => <Action key={action.id} action={action} />)
        )}
      </div>
    </div>
  );
}

export default ActionsSection;

