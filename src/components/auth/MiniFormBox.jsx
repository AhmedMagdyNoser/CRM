import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from '../global/ErrorAlert';
import SubmitButton from '../global/SubmitButton';
import ScreenBox from './ScreenBox';

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
    <ScreenBox>
      <form
        onSubmit={onSubmit}
        autoComplete="off"
        className="flex w-full flex-col justify-between gap-3 p-6 sm:w-[500px] sm:p-12 md:w-[650px]"
      >
        {/* We have 2 divs inside as, in mobile devices, we need one in top and one in bottom (justify-between in parent) */}
        <div className="flex flex-col items-center gap-3">
          {image && (
            <div className="h-[215px] w-[215px]">
              <img className="w-full" src={image} alt={title} />
            </div>
          )}
          <h1 className="text-center">{title}</h1>
          <p className="text-center">{paragraph}</p>
          {children}
        </div>
        <div className="flex flex-col gap-3">
          {error && <ErrorAlert message={error} />}
          <SubmitButton label={submitButtonLabel} loading={loading} disabled={submitButtonDisabled || loading} />
          {backButton && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-light flex-center gap-2 self-start px-5 py-2 uppercase"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back
            </button>
          )}
        </div>
      </form>
    </ScreenBox>
  );
}

export default MiniFormBox;
