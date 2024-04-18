import InterestCheckbox from './InterestCheckbox';
import InterestCheckboxSkeleton from './InterestCheckboxSkeleton';

export default function InterestsInputField({ interestsOptions, selectedInterests, setSelectedInterests, loading }) {
  return (
    <fieldset className="scrollbar-hide max-h-48 overflow-auto rounded-xl border p-2">
      <legend className="text-gray-500">Interests</legend>
      <div className="grid sm:grid-cols-2">
        {loading ? (
          <InterestCheckboxSkeleton length={3} />
        ) : interestsOptions.length === 0 ? (
          <p className="p-2">No interests found</p>
        ) : (
          interestsOptions.map((interest) => (
            <InterestCheckbox
              key={interest.id}
              interest={interest}
              selectedInterests={selectedInterests}
              setSelectedInterests={setSelectedInterests}
            />
          ))
        )}
      </div>
    </fieldset>
  );
}
