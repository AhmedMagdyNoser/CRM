import { useState } from 'react';
import { useParams } from 'react-router-dom';
import usePrivateAxios from '../../../../../hooks/usePrivateAxios';
import Modal from '../../../../../components/ui/Modal';

export default function AddNewActionPopup({ setAddNewActionPopupOpen }) {
  const privateAxios = usePrivateAxios();

  const id = useParams().id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Modal title="Add New Action" setOpen={setAddNewActionPopupOpen}>
      <div className="flex flex-col gap-4 p-5">Helloooooo!</div>
    </Modal>
  );
}
