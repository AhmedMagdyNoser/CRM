import { faAddressBook, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { inputFieldsInstructions } from '../../utils/utils';

/**
 * `InputField` is a general input field component that can be used for all types of inputs.
 *
 * It displays an icon (if provided) and an input field. If the input field fails validation, it also displays a validation error message.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.icon - The Font Awesome icon to be displayed before the input field.
 * @param {boolean} props.isValid - Indicates the validation status of the input field. If `false`, the `instructions` text is displayed as an error message.
 * @param {string} props.instructions - The validation error message to be displayed when `isValid` is `false`.
 * @returns {ReactElement} A div element that wraps the input field and the validation error message.
 */

function InputField({ icon, value, isValid, instructions, className = '', ...rest }) {
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
        <div className="flex flex-col gap-1 py-1 text-proerror-100">
          <div className="h-[3px] animate-progress-fast rounded-md bg-proerror-100"></div>
          <div className="animate-fade-in-fast text-sm">{instructions}</div>
        </div>
      )}
    </div>
  );
}

export default InputField;

/**
 * `InputField.Name` is a specific type of `InputField` for name inputs.
 * You don't need to pass props like `type`, `icon`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `18` by default.
 *
 * @param {Object} props The properties passed to the component.
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for name inputs.
 */
InputField.Name = function Name({ ...rest }) {
  return <InputField type="text" icon={faUser} instructions={inputFieldsInstructions.name} maxLength={18} {...rest} />;
};

/**
 * `InputField.Username` is a specific type of `InputField` for username inputs.
 * You don't need to pass props like `type`, `icon`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `18` by default.
 *
 * @param {Object} props The properties passed to the component.
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for username inputs.
 */
InputField.Username = function Username({ ...rest }) {
  return (
    <InputField type="text" icon={faAddressBook} instructions={inputFieldsInstructions.username} maxLength={18} {...rest} />
  );
};

/**
 * `InputField.Email` is a specific type of `InputField` for email inputs.
 * You don't need to pass props like `type`, `icon`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `50` by default.
 *
 * @param {Object} props The properties passed to the component.
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for email inputs.
 */
InputField.Email = function Email({ ...rest }) {
  return <InputField type="email" icon={faEnvelope} instructions={inputFieldsInstructions.email} maxLength={50} {...rest} />;
};

/**
 * `InputField.Password` is a specific type of `InputField` for password inputs.
 * You don't need to pass props like `type`, `icon`, and `instructions` when using this component.
 * Also, the `maxLength` prop is set to `32` by default.
 *
 * @param {Object} props The properties passed to the component.
 * @param {boolean} props.isValid - Indicates the validation status of the input field.
 * @returns {ReactElement} An InputField element with specific props for password inputs.
 */
InputField.Password = function Password({ ...rest }) {
  return (
    <InputField type="password" icon={faLock} instructions={inputFieldsInstructions.password} maxLength={32} {...rest} />
  );
};
