import { useNavigate } from 'react-router-dom';
import ScreenCenterContainer from '../global/ScreenCenterContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * `AuthMiniBox` is a component that wraps its children in a centered box on the screen.
 * It optionally displays a back button that navigates to the previous page when clicked.
 * 
 * The component is styled as a white flex container and its children are stacked vertically.
 * On mobile devices, it takes the full height and width and a small padding.
 * From small screens and up, it adjusts its height and width to fit its content, applies rounded corners, increases the padding, and adds a shadow. So it looks like a card.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.backButton - Indicates whether the back button should be displayed. If `true`, a back button is displayed.
 * @param {ReactNode} props.children - The child elements to be rendered inside the box.
 * @returns {ReactElement} A `ScreenCenterContainer` element that wraps a div, which in turn wraps the child elements and an optional back button.
 */

function AuthMiniBox({ className = '', backButton, children }) {
  const navigate = useNavigate();

  return (
    <ScreenCenterContainer className='bg-progray-100'>
      <div className={'auth-box flex-col gap-3 ' + className}>
        {children}
        {backButton && (
          <button onClick={() => navigate(-1)} className="btn-light flex-center gap-2 self-start px-5 py-2 uppercase">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
        )}
      </div>
    </ScreenCenterContainer>
  );
}

export default AuthMiniBox;
