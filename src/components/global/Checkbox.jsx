import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Checkbox({ label, checked, onClick }) {
  const handleKeyDown = (event) => {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      tabIndex={0}
      className="text-progray-300 flex cursor-pointer items-center gap-1"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <FontAwesomeIcon icon={checked ? faCheckSquare : faSquare} className="text-lg text-pro-300" />
      <p className="select-none">{label}</p>
    </div>
  );
}

export default Checkbox;
