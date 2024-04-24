import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { globalErrorMessage } from '../../../../../utils/utils';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import useInterests from '../../../../../hooks/useInterests';
import icons from '../../../../../utils/faIcons';

export default function DisableMode({ interest, setDisableMode }) {
  const privateAxios = usePrivateAxios();

  const { setInterests } = useInterests();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setError('');
        setLoading(true);
        const res = await privateAxios({
          method: 'put',
          url: '/manager/update-interest',
          data: { id: interest.id, name: interest.name, isDisabled: true },
        });
        setInterests((prev) => {
          return {
            data: {
              disabled: [...prev.data.disabled, res.data],
              enabled: prev.data.enabled.filter((i) => i.id !== res.data.id),
            },
            loading: false,
            error: '',
          };
        });
        setDisableMode(false);
      } catch (error) {
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      } finally {
        setLoading(false);
      }
    },
    [privateAxios, interest.id, interest.name, setDisableMode, setInterests],
  );

  // On Enter key press
  useEffect(() => {
    function handleEnterKey(event) {
      if (event.key === 'Enter') handleUpdate(event);
    }

    document.addEventListener('keydown', handleEnterKey);
    return () => document.removeEventListener('keydown', handleEnterKey);
  }, [handleUpdate]);

  return (
    <>
      <p className="flex-1 px-3 text-sm font-semibold sm:text-base">Are you sure you want to disable this interest?</p>

      <div className="flex gap-2">
        {error && (
          <div className="flex-center h-10 rounded-xl bg-red-100 px-4 text-sm text-red-500">
            <FontAwesomeIcon icon={icons.exclamationCircle} />
          </div>
        )}
        <button
          onClick={handleUpdate}
          className="btn-danger flex-center h-10 gap-2 rounded-xl px-4 text-sm font-semibold"
          disabled={loading}
        >
          {loading ? (
            <>
              <FontAwesomeIcon icon={icons.spinner} spin />
              <span>Disabling</span>
            </>
          ) : (
            <span>Disable</span>
          )}
        </button>
        <button
          onClick={() => setDisableMode(false)}
          className="flex-center h-10 rounded-xl bg-gray-100 px-4 text-sm font-normal text-gray-500 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
