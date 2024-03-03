import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function SubmitButton({ label, loading, ...rest }) {
  return (
    <button type="submit" className="btn-primary py-3 uppercase" {...rest}>
      {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" /> : label}
    </button>
  );
}

export default SubmitButton;
