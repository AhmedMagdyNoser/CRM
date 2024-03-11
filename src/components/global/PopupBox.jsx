import { useEffect, useRef } from 'react';
import { layoutDimensions } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function PopupBox({ title, closePopup, animationTime = 250, children }) {
  const screen = useRef(null);
  const box = useRef(null);

  function handleClose() {
    setTimeout(() => {
      closePopup();
    }, animationTime);
    box.current.style.animation = `half-pop-down ${+animationTime}ms`;
    screen.current.style.animation = `fade-out ${+animationTime}ms`;
    screen.current.style.opacity = `0`;
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (box.current && !box.current.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div
      ref={screen}
      className="popup-height flex-center fixed left-0 top-0 z-40 w-full rounded-none bg-[#00000025] sm:bg-[#00000050]"
      style={{ animation: `fade-in ${animationTime}ms` }}
    >
      <div
        ref={box}
        className="flex h-full w-full flex-col rounded-none bg-white sm:h-[550px] sm:w-[500px] sm:rounded-xl sm:shadow-xl lg:w-[600px]"
        style={{ animation: `half-pop-up ${animationTime}ms` }}
      >
        <header className="flex items-center justify-between rounded-none border-b p-5">
          <h2 className="capitalize">{title}</h2>
          <button className="btn-light flex-center h-8 w-8" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>
        {children}
      </div>
      <style>
        {`
          .popup-height {
            height: calc(100% - ${layoutDimensions.navbarSize}px);
          }
          @media (min-width: 612px) {
            .popup-height {
              height: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default PopupBox;
