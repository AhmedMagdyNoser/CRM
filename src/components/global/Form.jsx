import ErrorAlert from './ErrorAlert';
import SubmitButton from './SubmitButton';

function Form({ onSubmit, loading, error, submitButtonLabel, submitButtonDisabled, children }) {
  return (
    <form onSubmit={onSubmit} autoComplete="off" className="flex h-full w-full flex-col justify-between gap-3 sm:w-[500px]">
      <div className="flex flex-col gap-3">{children}</div>
      <div className="flex flex-col gap-3">
        {error && <ErrorAlert message={error} />}
        <SubmitButton label={submitButtonLabel} loading={loading} disabled={submitButtonDisabled || loading} />
      </div>
    </form>
  );
}

export default Form;
