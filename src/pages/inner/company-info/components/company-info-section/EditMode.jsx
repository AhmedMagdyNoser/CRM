import { useState } from 'react';
import InputField from '../../../../../components/ui/InputField';
import useCompany from '../../../../../hooks/useCompany';

function EditMode() {
  const { company } = useCompany();

  const [name, setName] = useState(company.data.name);
  const [description, setDescription] = useState(company.data.description);

  return (
    <section className="flex flex-col gap-3">
      <InputField
        placeholder="Company Name (Required)"
        className="p-6 text-3xl font-bold"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <textarea
        placeholder="Description (Optional)"
        className="resize-none rounded-xl border-none bg-gray-100 p-6 text-gray-800 outline-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </section>
  );
}

export default EditMode;
