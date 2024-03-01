import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RegisterInputField({ value, isValid, icon, instructions, ...rest }) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 shadow-sm">
        <FontAwesomeIcon
          icon={icon}
          className={(value && isValid ? 'text-pro-300' : 'text-gray-500') + ' transition-colors duration-1000'}
        />
        <input className="flex-1 bg-inherit outline-none py-3" value={value} {...rest} size={1} />
      </div>
      {value && !isValid && (
        <>
          <div className="animate-progress-fast mt-1 h-[3px] w-full rounded-md bg-red-500"></div>
          <div className="animate-fade-in-fast flex py-1 text-sm text-red-500">
            <FontAwesomeIcon icon={faExclamationCircle} className="p-1" />
            <div>{instructions}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default RegisterInputField;
