import { useState } from "react";

function EditMode({ interest, setEditMode }) {
  const [name, setName] = useState(interest.name);

  return (
    <>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Interest Name"
        className="flex-1 px-3 outline-none placeholder:font-normal"
        autoFocus
      />
      <div className="flex gap-2">
        <button className="btn-secondary flex-center h-10 rounded-xl px-4 text-sm font-semibold">
          {/* <FontAwesomeIcon icon={icons.spinner} spin /> */}
          Update
        </button>
        <button
          onClick={() => setEditMode(false)}
          className="flex-center h-10 rounded-xl bg-gray-100 px-4 text-sm font-normal hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditMode;
