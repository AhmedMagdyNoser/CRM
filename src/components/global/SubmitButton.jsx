import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function SubmitButton({ label, loading, ...rest }) {
  return (
    <button
      type="submit"
      className="w-full rounded-md bg-pro-300 p-3 font-bold uppercase text-pro-50 transition hover:bg-pro-200 disabled:bg-pro-200"
      {...rest}
    >
      {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" /> : label}
    </button>
  );
}

export default SubmitButton;
