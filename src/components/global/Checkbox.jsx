import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Checkbox({ label, checked, onClick }) {
  return (
    <div className="text-progray-300 flex cursor-pointer items-center gap-1" onClick={onClick}>
      <FontAwesomeIcon icon={checked ? faCheckSquare : faSquare} className="text-lg text-pro-300" />
      <p className="select-none">{label}</p>
    </div>
  );
}

export default Checkbox;
