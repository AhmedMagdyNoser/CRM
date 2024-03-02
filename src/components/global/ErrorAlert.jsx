import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function ErrorAlert({ message }) {
  return (
    <div className="flex animate-fade-in-fast items-center gap-2 rounded-md bg-red-100 p-3 text-red-600">
      <FontAwesomeIcon icon={faExclamationCircle} />
      <div>{message}</div>
    </div>
  );
}

export default ErrorAlert;
