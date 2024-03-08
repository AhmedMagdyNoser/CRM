import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function ErrorAlert({ message }) {
  return (
    <div className="flex animate-fade-in-fast items-center gap-3 rounded-xl bg-proerror-50 px-4 py-3 text-sm text-proerror-100">
      <FontAwesomeIcon icon={faExclamationCircle} />
      <div>{message}</div>
    </div>
  );
}

export default ErrorAlert;
