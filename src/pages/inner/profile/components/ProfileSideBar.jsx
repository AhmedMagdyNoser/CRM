import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paths } from '../../../../utils/utils';
import DeleteModal from './DeleteModal';
import icons from '../../../../utils/faIcons';

const routes = [
  {
    id: 1,
    title: 'Profile',
    path: `/${paths.profile}`,
    icon: icons.profile,
  },
  {
    id: 2,
    title: 'Password',
    path: `/${paths.profile}/change-password`,
    icon: icons.password,
  },
  {
    id: 3,
    title: 'Notifications',
    path: `/${paths.profile}/notifications`,
    icon: icons.notifications,
  },
];

export default function ProfileSidebar() {
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  return (
    <div className="px-5">
      {routes.map((route) => (
        <NavLink
          className="flex items-center gap-2 rounded-xl p-4 font-semibold text-gray-800 transition-colors hover:bg-gray-100"
          key={route.id}
          to={route.path}
        >
          <FontAwesomeIcon icon={route.icon} />
          <span>{route.title}</span>
        </NavLink>
      ))}
      <div className="my-5 h-[1px] w-full bg-gray-100"></div>
      <button
        className="flex w-full items-center gap-2 rounded-xl p-4 text-red-500 transition-colors hover:bg-red-50"
        onClick={() => setDeletePopupOpen(true)}
      >
        <FontAwesomeIcon icon={icons.trash} />
        Delete your Account
      </button>
      <style>
        {` .active { color: #7050FF; } `}
      </style>
      {deletePopupOpen && <DeleteModal setDeletePopupOpen={setDeletePopupOpen} />}
    </div>
  );
}
