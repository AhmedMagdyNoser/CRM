import { Link } from 'react-router-dom';
import pageNotFound from '../../assets/pageNotFound.svg';
import CaptionCard from '../../components/global/CaptionCard';

function NotFound() {
  return (
    <div className="flex-center h-full flex-col gap-3">
      <CaptionCard image={pageNotFound} title="Page Not Found" paragraph="The page you are looking for does not exist." />
      <Link to="/" className="btn-secondary px-4 py-2">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
