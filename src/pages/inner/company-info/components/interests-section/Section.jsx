import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInterests from '../../../../../hooks/useInterests';
import InterestsList from './InterestsList';
import icons from '../../../../../utils/faIcons';
import Alert from '../../../../../components/ui/Alert';

export default function InterestsSection() {
  const { interests } = useInterests();

  const [showDisabled, setShowDisabled] = useState(false);

  const toggleDisabledInterests = () => setShowDisabled(!showDisabled);

  return (
    <section className="flex flex-col gap-4 rounded-md bg-gray-100 p-5">
      <h2 className="text-2xl font-bold">Interests</h2>
      {interests.loading ? (
        <div className="flex-center h-72 flex-col gap-4">
          <FontAwesomeIcon icon={icons.spinner} spin className="text-4xl text-pro-300" />
          <p>Loading interests...</p>
        </div>
      ) : interests.error ? (
        <Alert.Error message={interests.error} />
      ) : (
        <>
          <InterestsList interests={interests.data.enabled} />
          {interests.data.disabled.length > 0 && (
            <button className="w-fit font-semibold text-pro-200 hover:text-pro-300" onClick={toggleDisabledInterests}>
              {showDisabled ? 'Hide' : 'Show'} Disabled Interests
            </button>
          )}
          {showDisabled && <InterestsList interests={interests.data.disabled} />}
        </>
      )}
    </section>
  );
}
