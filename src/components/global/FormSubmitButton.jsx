import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function FormSubmitButton({ label, loading, ...rest }) {
  return (
    <button
      type="submit"
      className="w-full rounded-md bg-pro-400 p-3 font-bold uppercase text-white transition hover:bg-pro-300 disabled:opacity-50 disabled:hover:bg-pro-400"
      {...rest}
    >
      {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" /> : label}
    </button>
  );
}

export default FormSubmitButton;
