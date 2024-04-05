import { faAngleDown, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

function DropdownMenu({ options = [], selected, setSelected, searchable, icon, loading, className = '', ...rest }) {
  const element = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState('');
  const [openMenu, setOpenMenu] = useState(false);

  let filteredOptions = options;

  // Filter options based on query
  if (query) filteredOptions = options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    // Set selected value if query matches an option
    const matchingOption = options.find((option) => query.toLowerCase() === option.label.toLowerCase());
    if (matchingOption) setSelected(matchingOption.value);
    else setSelected('');
  }, [query, options, setSelected]);

  useEffect(() => {
    function handleClickOutsideElement(event) {
      if (element.current && !element.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutsideElement);
    return () => document.removeEventListener('mousedown', handleClickOutsideElement);
  }, [element]);

  useEffect(() => {
    function handleFocus() {
      setOpenMenu(true);
    }

    const inputElement = inputRef.current;
    inputElement.addEventListener('focus', handleFocus);
    return () => {
      inputElement.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <div ref={element} onClick={() => setOpenMenu(!openMenu)} className="relative w-full cursor-pointer">
      <div className="flex items-center overflow-hidden rounded-xl bg-gray-100">
        {icon && <FontAwesomeIcon icon={icon} className="pl-3 text-gray-500" />}
        <input
          className={`flex-1 cursor-pointer bg-inherit p-3 text-gray-800 outline-none placeholder:text-gray-500 ${className}`}
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setOpenMenu(true);
            setQuery(e.target.value);
          }}
          readOnly={!searchable}
          size={1}
          {...rest}
        />
        {selected ? (
          <MenuButton onClick={() => setQuery('')}>
            <FontAwesomeIcon icon={faX} />
          </MenuButton>
        ) : (
          <MenuButton>
            <FontAwesomeIcon icon={faAngleDown} />
          </MenuButton>
        )}
      </div>

      {openMenu && (
        <div className="absolute top-full z-50 w-full cursor-default rounded-xl border bg-white py-3 text-gray-800 shadow-md placeholder:text-gray-500">
          {loading ? (
            <div className="p-2 px-4 text-sm text-gray-500">Loading Options...</div>
          ) : filteredOptions.length === 0 ? (
            <div className="p-2 px-4 text-sm text-gray-500">No options matched</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="selection-none cursor-pointer border-l-4 border-transparent p-2 px-4 transition-colors hover:border-pro-300 hover:bg-pro-50"
                onClick={() => {
                  setQuery(option.label);
                  setSelected(option.value);
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

function MenuButton({ children, ...rest }) {
  return (
    <button
      type="button"
      className="flex-center mr-3 h-7 w-7 rounded-full bg-gray-200 text-xs text-gray-500 transition-colors hover:bg-gray-300"
      {...rest}
    >
      {children}
    </button>
  );
}
