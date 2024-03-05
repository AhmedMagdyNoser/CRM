import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from './ErrorAlert';

function Form({ className = '', loading, error, submitButtonLabel, submitButtonDisabled, children, ...rest }) {
  return (
    <form className={'flex h-full w-full flex-col justify-between gap-3 ' + className} {...rest}>
      <div className="flex flex-col gap-3">{children}</div>
      <div className="flex flex-col gap-3">
        {error && <ErrorAlert message={error} />}
        <button type="submit" className="btn-primary py-3 uppercase" disabled={submitButtonDisabled || loading}>
          {loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin-slow" /> : submitButtonLabel}
        </button>
      </div>
    </form>
  );
}

export default Form;
