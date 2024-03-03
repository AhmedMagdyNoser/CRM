import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Loader({ message = 'Just one second...' }) {
  return (
    <div className="flex-center h-screen flex-col gap-6">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow text-5xl text-pro-300" />
      <p className="text-xl text-progray-300">{message}</p>
    </div>
  );
}

export default Loader;
