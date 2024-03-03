import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function ErrorAlert({ message }) {
  return (
    <div className="bg-proerror-50 text-proerror-100 flex animate-fade-in-fast items-center gap-2 rounded-md p-3 text-sm sm:text-base">
      <FontAwesomeIcon icon={faExclamationCircle} />
      <div>{message}</div>
    </div>
  );
}

export default ErrorAlert;
