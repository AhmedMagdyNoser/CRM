import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

export default function InterestCheckbox({ interest, selectedInterests, setSelectedInterests }) {
  const { id, name } = interest;

  const isSelected = selectedInterests.some((interest) => interest.id === id);

  return (
    <div className="w-full animate-fade-in-medium rounded-xl px-4 hover:bg-gray-100">
      <label className="flex h-10 cursor-pointer items-center gap-2 text-nowrap text-sm font-medium text-gray-500 sm:text-base">
        <FontAwesomeIcon
          icon={isSelected ? faCheckSquare : faSquare}
          className={isSelected ? 'text-pro-300' : 'text-gray-500'}
        />
        <input
          type="checkbox"
          value={id}
          className="hidden"
          checked={isSelected}
          onChange={(e) => {
            if (e.target.checked) setSelectedInterests([...selectedInterests, { id }]);
            else setSelectedInterests(selectedInterests.filter((interest) => interest.id !== id));
          }}
        />
        {name}
      </label>
    </div>
  );
}
