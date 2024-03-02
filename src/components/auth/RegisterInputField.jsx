import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RegisterInputField({ value, isValid, icon, instructions, grow, ...rest }) {
  return (
    <div className="w-full">
      <div className="bg-progray-50 flex items-center gap-2 rounded-md px-3 shadow-sm">
        <FontAwesomeIcon
          icon={icon}
          className={(value && isValid ? 'text-pro-300' : 'text-progray-200') + ' transition-colors duration-1000'}
        />
        <input
          className="text-progray-300 placeholder:text-progray-200 flex-1 bg-inherit py-3 outline-none"
          value={value}
          size={1}
          {...rest}
        />
      </div>
      {isValid !== undefined && value && !isValid && (
        <>
          <div className="bg-proerror-100 mt-1 h-[3px] w-full animate-progress-fast rounded-md"></div>
          <div className="text-proerror-100 flex animate-fade-in-fast py-1 text-sm">{instructions}</div>
        </>
      )}
    </div>
  );
}

export default RegisterInputField;
