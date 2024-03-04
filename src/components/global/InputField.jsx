import { faAddressBook, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { inputFieldsInstructions } from '../../utils/utils';

/**
 * InputField is a general input field component that can be used for all types of inputs.
 *
 * @param {Object} props The properties passed to the input field.
 * @param {IconDefinition} props.icon (Addition) The icon to be displayed before the input field.
 * @param {boolean} props.isValid (Addition) The validation status of the input field.
 * @param {string} props.instructions (Addition) The validation error message to be displayed.
 * @returns {ReactElement} A div element that wraps the input field and the validation error message.
 */

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

/**
 * Name is a specific type of InputField for name inputs.
 * It has specific props for name inputs. like type, icon, instructions, and maxLength.
 * You don't need to pass these props when using this component.
 *
 * @param {Object} props The properties passed to the component.
 * @returns {ReactElement} An InputField element with specific props for name inputs.
 */
InputField.Name = function Name({ ...rest }) {
  return <InputField type="text" icon={faUser} instructions={inputFieldsInstructions.name} maxLength={18} {...rest} />;
};

/**
 * Username is a specific type of InputField for username inputs.
 * It has specific props for username inputs. like type, icon, instructions, and maxLength.
 * You don't need to pass these props when using this component.
 * 
 * @param {Object} props The properties passed to the component.
 * @returns {ReactElement} An InputField element with specific props for username inputs.
 */
InputField.Username = function Username({ ...rest }) {
  return (
    <InputField type="text" icon={faAddressBook} instructions={inputFieldsInstructions.username} maxLength={18} {...rest} />
  );
};

/**
 * Email is a specific type of InputField for email inputs.
 * It has specific props for email inputs. like type, icon, instructions, and maxLength.
 * You don't need to pass these props when using this component.
 * 
 * @param {Object} props The properties passed to the component.
 * @returns {ReactElement} An InputField element with specific props for email inputs.
 */
InputField.Email = function Email({ ...rest }) {
  return <InputField type="email" icon={faEnvelope} instructions={inputFieldsInstructions.email} maxLength={50} {...rest} />;
};

/**
 * Password is a specific type of InputField for password inputs.
 * It has specific props for password inputs. like type, icon, instructions, and maxLength.
 * You don't need to pass these props when using this component.
 * 
 * @param {Object} props The properties passed to the component.
 * @returns {ReactElement} An InputField element with specific props for password inputs.
 */
InputField.Password = function Password({ ...rest }) {
  return (
    <InputField type="password" icon={faLock} instructions={inputFieldsInstructions.password} maxLength={32} {...rest} />
  );
};
