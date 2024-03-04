import { useNavigate } from 'react-router-dom';
import ScreenCenterContainer from '../global/ScreenCenterContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AuthMiniBox({ className = '', backButton, children }) {
  const navigate = useNavigate();

  return (
    <ScreenCenterContainer>
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
