import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InputField({ value, isValid, icon, instructions, className, ...rest }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 rounded-md bg-progray-50 px-3 shadow-sm">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={(value && isValid ? 'text-pro-300' : 'text-progray-200') + ' transition-colors duration-1000'}
          />
        )}
        <input
          className={'flex-1 bg-inherit py-3 text-progray-300 outline-none placeholder:text-progray-200 ' + className}
          value={value}
          size={1}
          {...rest}
        />
      </div>
      {isValid !== undefined && value && !isValid && (
        <>
          <div className="mt-1 h-[3px] w-full animate-progress-fast rounded-md bg-proerror-100"></div>
          <div className="animate-fade-in-fast py-1 text-sm text-proerror-100">{instructions}</div>
        </>
      )}
    </div>
  );
}

export default InputField;
