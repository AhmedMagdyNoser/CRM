import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

export default function InterestCheckbox({ interest, selectedInterests, setSelectedInterests }) {
  const { id, name } = interest;

  const isSelected = selectedInterests.some((interest) => interest.id === id);

  function toggleInterest() {
    if (isSelected) setSelectedInterests(selectedInterests.filter((interest) => interest.id !== id));
    else setSelectedInterests([...selectedInterests, { id }]);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleInterest();
    }
  }

  return (
    <div
      tabIndex={0}
      onClick={toggleInterest}
      onKeyDown={handleKeyDown}
      className="w-full animate-fade-in-medium rounded-xl px-4 hover:bg-gray-100"
    >
      <label className="flex h-10 cursor-pointer items-center gap-2 text-nowrap text-sm font-medium text-gray-500 sm:text-base">
        <FontAwesomeIcon
          icon={isSelected ? faCheckSquare : faSquare}
          className={isSelected ? 'text-pro-300' : 'text-gray-500'}
        />
        {name}
      </label>
    </div>
  );
}
