import { Link } from 'react-router-dom';
import pageNotFound from '../../assets/pageNotFound.svg';

function NotFound() {
  return (
    <div className="flex-center h-screen bg-progray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-[215px] w-[215px]">
          <img className="h-full" src={pageNotFound} alt="Page Not Found" />
        </div>
        <h1 className="text-center">Page Not Found</h1>
        <p className="text-center text-sm sm:text-base">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-secondary px-5 py-2">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
