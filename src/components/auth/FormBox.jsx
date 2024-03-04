import { Link } from 'react-router-dom';
import defaultImage from '../../assets/defaultImage.svg';
import ErrorAlert from '../global/ErrorAlert';
import SubmitButton from '../global/SubmitButton';
import ScreenBox from './ScreenBox';

/**
 * FormBox is a component that displays an image and a form.
 *
 * @param {Object} props The properties passed to the component.
 * @param {Function} props.onSubmit The function to call when the form is submitted.
 * @param {boolean} props.loading Whether the form is currently being submitted.
 * @param {string} props.error An error message to display.
 * @param {string} props.image The URL of the image to display.
 * @param {boolean} props.fixedHeightOnSMScreen Whether the form box should have a fixed height on small screens.
 * @param {boolean} props.fixedHeightOnXLScreen Whether the form box should have a fixed height on extra large screens.
 * @param {string} props.title The title to display above the form.
 * @param {string} props.submitButtonLabel The label for the submit button.
 * @param {boolean} props.submitButtonDisabled A condition whether submit button should be disabled.
 * @param {Object} props.leave An object with `hint`, `link`, and `label` properties for the leave link.
 * @param {ReactNode} props.children The child elements to be rendered inside the form.
 * @returns {ReactElement} A ScreenBox element that wraps the image and the form.
 *
 */

function FormBox({
  onSubmit,
  loading,
  error,
  image,
  fixedHeightOnSMScreen,
  fixedHeightOnXLScreen,
  title,
  submitButtonLabel,
  submitButtonDisabled,
  leave,
  children,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <ScreenBox>
      <ImageBox image={image} />
      <Divider />
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={
          'flex h-full w-full flex-col justify-between gap-3 p-6 sm:w-[600px] sm:p-12 ' +
          (fixedHeightOnSMScreen ? 'sm:h-[600px] ' : '') +
          (fixedHeightOnXLScreen ? 'xl:h-[600px] ' : '')
        }
      >
        {/* We have 2 divs inside as, in mobile devices and if the height is fixed, we need one in top and one in bottom (justify-between in parent) */}
        <div className="flex flex-1 flex-col gap-3 overflow-auto">
          <h1 className="mb-3">{title}</h1>
          {children}
        </div>

        <div className="flex flex-col gap-3">
          {error && <ErrorAlert message={error} />}
          <SubmitButton label={submitButtonLabel} loading={loading} disabled={submitButtonDisabled || loading} />
          {leave && (
            <div className="flex flex-wrap justify-center gap-1">
              {leave.hint && <span className="text-progray-300">{leave.hint}</span>}
              <Link className="font-bold text-pro-200 transition-colors hover:text-pro-300" to={leave.link}>
                {leave.label}
              </Link>
            </div>
          )}
        </div>
      </form>
    </ScreenBox>
  );
}

export default FormBox;

function Divider() {
  return <div className="my-12 hidden w-[2px] rounded bg-progray-100 xl:flex"></div>;
}

function ImageBox({ image = defaultImage }) {
  return (
    <div className="xl:flex-center hidden w-[550px] p-12">
      <img src={image} alt="Join our community" className="w-4/5" />
    </div>
  );
}
