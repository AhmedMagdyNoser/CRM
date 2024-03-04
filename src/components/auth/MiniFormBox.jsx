import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ErrorAlert from '../global/ErrorAlert';
import SubmitButton from '../global/SubmitButton';
import ScreenBox from './ScreenBox';

/**
 * MiniFormBox is a component that displays an image and a form in a smaller box.
 * 
 * @param {Object} props The properties passed to the component.
 * @param {Function} props.onSubmit The function to call when the form is submitted.
 * @param {boolean} props.loading Whether the form is currently being submitted.
 * @param {string} props.error An error message to display.
 * @param {string} props.image The URL of the image to display.
 * @param {string} props.title The title to display above the form.
 * @param {string} props.paragraph The paragraph to display below the title.
 * @param {string} props.submitButtonLabel The label for the submit button.
 * @param {boolean} props.submitButtonDisabled A condition whether submit button should be disabled.
 * @param {boolean} props.backButton A condition whether back button should be displayed.
 * @param {ReactNode} props.children The child elements to be rendered inside the form.
 */

function MiniFormBox({
  onSubmit,
  loading,
  error,
  image,
  title,
  paragraph,
  submitButtonLabel,
  submitButtonDisabled,
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
