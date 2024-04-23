import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCompany from '../../../../../hooks/useCompany';
import InputField from '../../../../../components/ui/InputField';
import Alert from '../../../../../components/ui/Alert';
import icons from '../../../../../utils/faIcons';

function EditMode({ setEditMode }) {
  const { company } = useCompany();

  const [name, setName] = useState(company.data.name);
  const [description, setDescription] = useState(company.data.description);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <form className={`flex flex-col gap-3 transition-opacity ${loading ? 'opacity-75' : ''}`}>
      <InputField
        placeholder="Company Name (Required)"
        className="p-6 text-3xl font-bold"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <textarea
        placeholder="Description (Optional)"
        className="resize-none rounded-xl border-none bg-gray-100 p-6 text-gray-800 outline-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      {error && <Alert.Error message={error} />}
      <div className="flex justify-end gap-2">
        <button type="submit" className="btn-primary flex-center gap-2 rounded-xl px-4 py-3" disabled={loading || !name}>
          {loading ? (
            <>
              <FontAwesomeIcon icon={icons.spinner} spin />
              <span>Updating</span>
            </>
          ) : (
            <span>Update</span>
          )}
        </button>
        <button
          onClick={() => setEditMode(false)}
          className="flex-center gap-2 rounded-xl bg-gray-100 p-3 px-5 text-xs text-gray-500 transition-colors hover:bg-gray-200 sm:text-sm"
        >
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
}

export default EditMode;
