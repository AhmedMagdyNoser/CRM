import { Outlet } from 'react-router-dom';
import ProfileSidebar from './components/ProfileSideBar';

export default function Profile() {
  return (
    <div className="flex gap-5">
      <div className="w-[275px]">
        <ProfileSidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
