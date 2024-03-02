import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RegisterInputField({ value, isValid, icon, instructions, grow, ...rest }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 shadow-sm">
        <FontAwesomeIcon
          icon={icon}
          className={(value && isValid ? 'text-pro-400' : 'text-gray-500') + ' transition-colors duration-1000'}
        />
        <input className="flex-1 bg-inherit py-3 outline-none" value={value} {...rest} size={1} />
      </div>
      {value && !isValid && (
        <>
          <div className="mt-1 h-[3px] w-full animate-progress-fast rounded-md bg-red-500"></div>
          <div className="flex animate-fade-in-fast py-1 text-sm text-red-500">{instructions}</div>
        </>
      )}
    </div>
  );
}

export default RegisterInputField;
