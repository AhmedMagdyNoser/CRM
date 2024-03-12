import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

function SelectMenu({ icon, search, options, value, setValue, className = '', ...rest }) {
  const element = useRef(null);
  const [label, setLabel] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    function handleClickOutside(event) {
      if (element.current && !element.current.contains(event.target)) {
        setOpenMenu(false);
        setFilteredOptions(options);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [element]);

  return (
    <div ref={element} className="relative w-full cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
      <div className="flex items-center overflow-hidden bg-progray-50">
        {icon && <FontAwesomeIcon icon={icon} className={'pl-3 text-progray-200 transition-colors duration-1000'} />}
        <input
          className={
            'flex-1 cursor-pointer bg-inherit p-3 text-progray-300 outline-none placeholder:text-progray-200 ' + className
          }
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
            setFilteredOptions(
              options.filter((option) => option.label.toLowerCase().includes(e.target.value.toLowerCase())),
            );
            setOpenMenu(true);
          }}
          readOnly={!search}
          size={1}
          {...rest}
        />
        <FontAwesomeIcon icon={faAngleDown} className="pr-3 text-progray-200" />
      </div>

      {openMenu && (
        <div className="absolute top-full z-50 w-full cursor-default border bg-white py-3 text-progray-300 shadow-md outline-none placeholder:text-progray-200">
          {filteredOptions.length === 0 ? (
            <div className="p-2 px-4 text-sm text-progray-200">No options matched</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="selection-none cursor-pointer rounded-none border-l-4 border-transparent p-2 px-4 hover:border-pro-300 hover:bg-pro-50"
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

export default SelectMenu;
