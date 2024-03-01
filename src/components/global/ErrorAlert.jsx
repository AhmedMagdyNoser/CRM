import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function ErrorAlert({ message }) {
  return (
    <div className="animate-fade-in-fast flex items-center gap-2 rounded-md bg-red-100 p-3 shadow-sm">
      <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600" />
      <div className="text-red-600">{message}</div>
    </div>
  );
}

export default ErrorAlert;
