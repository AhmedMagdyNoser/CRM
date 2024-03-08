import { Link, Outlet } from 'react-router-dom';
import ScreenCenterContainer from '../../components/global/ScreenCenterContainer';
import CaptionCard from '../../components/global/CaptionCard';
import unauthorized from '../../assets/unauthorized.svg';
import useAuth from '../../hooks/useAuth';

function Authorization({ allowedRole }) {
  const { auth } = useAuth();

  console.log('Rendering Authorization', { roles: auth.roles });

  return auth.roles?.includes(allowedRole) ? <Outlet /> : <Unauthorized name={auth.firstName} />;
}

export default Authorization;

function Unauthorized({ name }) {
  return (
    <ScreenCenterContainer className="flex-col gap-3">
      <CaptionCard
        image={unauthorized}
        title="Unauthorized Access"
        paragraph={`Sorry, ${name}, you do not have the necessary permissions to access this page.`}
      />
      <Link to="/" className="btn-secondary px-4 py-2">
        Back to Home
      </Link>
    </ScreenCenterContainer>
  );
}
