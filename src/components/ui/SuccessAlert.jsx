import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function SuccessAlert({ message }) {
  return (
    <div className="flex animate-fade-in-fast items-center gap-3 rounded-xl bg-green-100 px-4 py-3 text-sm text-green-600">
      <FontAwesomeIcon icon={faCheckCircle} />
      <div>{message}</div>
    </div>
  );
}

export default SuccessAlert;
