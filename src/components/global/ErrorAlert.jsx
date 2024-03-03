import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function ErrorAlert({ message }) {
  return (
    <div className="flex animate-fade-in-fast items-center gap-2 rounded-md bg-proerror-50 p-3 text-sm text-proerror-100 sm:text-base">
      <FontAwesomeIcon icon={faExclamationCircle} />
      <div>{message}</div>
    </div>
  );
}

export default ErrorAlert;
