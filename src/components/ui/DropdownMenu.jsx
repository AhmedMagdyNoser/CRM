import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

function DropdownMenu({ icon, search, options = [], loading, value, setValue, className = '', ...rest }) {
  const element = useRef(null);
  const [label, setLabel] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    function handleClickOutsideElement(event) {
      if (element.current && !element.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutsideElement);
    return () => document.removeEventListener('mousedown', handleClickOutsideElement);
  }, [element]);

  return (
    <div
      ref={element}
      className="relative w-full cursor-pointer"
      onClick={() => {
        setOpenMenu(!openMenu);
        setFilteredOptions(options);
      }}
    >
      <div className="flex items-center overflow-hidden rounded-xl bg-gray-100">
        {icon && <FontAwesomeIcon icon={icon} className={'pl-3 text-gray-500 transition-colors duration-1000'} />}
        <input
          className={
            'flex-1 cursor-pointer bg-inherit p-3 text-gray-800 outline-none placeholder:text-gray-500 ' + className
          }
          value={label}
          onChange={(e) => {
            const input = e.target.value;
            setLabel(input);
            setFilteredOptions(
              options.filter((option) => {
                if (input.toLowerCase() === option.label.toLowerCase())
                  setValue(option.value); // If the input matches an option, set the value
                else setValue('');
                return option.label.toLowerCase().includes(input.toLowerCase());
              }),
            );
            setOpenMenu(true);
          }}
          readOnly={!search}
          size={1}
          {...rest}
        />
        <FontAwesomeIcon icon={faAngleDown} className="pr-3 text-gray-500" />
      </div>

      {openMenu && (
        <div className="absolute top-full z-50 w-full cursor-default rounded-xl border bg-white py-3 text-gray-800 shadow-md outline-none placeholder:text-gray-500">
          {loading ? (
            <div className="p-2 px-4 text-sm text-gray-500">Loading Options...</div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-2 px-4 text-sm text-gray-500">No options matched</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="selection-none cursor-pointer border-l-4 border-transparent p-2 px-4 hover:border-pro-300 hover:bg-pro-50"
                onClick={() => {
                  setLabel(option.label);
                  setValue(option.value);
                }}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
