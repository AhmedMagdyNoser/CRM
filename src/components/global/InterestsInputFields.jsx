import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

function InterestsInputField({ interestsOptions, interests, setInterests, loading }) {
  return (
    <fieldset className="scrollbar-hide max-h-48 overflow-auto rounded-xl border p-2">
      <legend className="text-gray-500">Interests</legend>
      <div className="grid sm:grid-cols-2">
        {loading ? (
          <InterestsSkeleton />
        ) : interestsOptions.length === 0 ? (
          <p className="p-2">No interests found</p>
        ) : (
          interestsOptions.map((interest) => (
            <InterestCheckbox
              key={interest.interestID}
              value={interest.interestName}
              interests={interests}
              setInterests={setInterests}
            />
          ))
        )}
      </div>
    </fieldset>
  );
}

export default InterestsInputField;

function InterestCheckbox({ value, interests, setInterests }) {
  return (
    <div className="w-full animate-fade-in-medium rounded-xl px-4 hover:bg-gray-100">
      <label className="flex h-10 cursor-pointer items-center gap-2 text-nowrap text-sm font-medium text-gray-500 sm:text-base">
        <FontAwesomeIcon
          icon={interests.includes(value) ? faCheckSquare : faSquare}
          className={interests.includes(value) ? 'text-pro-300' : 'text-gray-500'}
        />
        <input
          type="checkbox"
          value={value}
          className="hidden"
          checked={interests.includes(value)}
          onChange={(e) => {
            if (e.target.checked) setInterests([...interests, value]);
            else setInterests(interests.filter((interest) => interest !== value));
          }}
        />
        {value}
      </label>
    </div>
  );
}

function InterestsSkeleton({ length = 3 }) {
  return Array.from({ length }).map((_, index) => (
    <div key={index} className="flex h-10 animate-pulse items-center gap-3 px-4">
      <div className="h-4 w-4 bg-gray-100"></div>
      <div className="h-3 w-24 rounded-xl bg-gray-100"></div>
    </div>
  ));
}
