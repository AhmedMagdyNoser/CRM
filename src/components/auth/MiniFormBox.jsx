import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from '../global/ErrorAlert';
import SubmitButton from '../global/SubmitButton';

function MiniFormBox({
  onSubmit,
  image,
  title,
  paragraph,
  submitButtonLabel,
  submitButtonDisabled,
  loading,
  error,
  backButton,
  children,
}) {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center bg-progray-50">
      <form
        onSubmit={onSubmit}
        autoComplete="off"
        className="flex h-full w-full animate-fade-in-fast flex-col justify-between gap-3 bg-white p-6 sm:h-fit sm:w-[500px] sm:rounded-xl sm:p-12 sm:shadow-lg lg:w-[650px]"
      >
        <div className="flex flex-col items-center gap-3">
          {image && (
            <div className="h-[215px] w-[215px]">
              <img className="w-full" src={image} alt={title} />
            </div>
          )}
          <h1 className="text-center text-2xl font-bold capitalize text-progray-300 sm:text-3xl">{title}</h1>
          <p className="text-center text-progray-200">{paragraph}</p>
          {children}
        </div>
        <div className="flex flex-col gap-3">
          {error && <ErrorAlert message={error} />}
          <SubmitButton label={submitButtonLabel} loading={loading} disabled={submitButtonDisabled || loading} />
          {backButton && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="self-start rounded-md px-5 py-2 uppercase text-progray-200 transition-colors hover:bg-progray-100"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MiniFormBox;
