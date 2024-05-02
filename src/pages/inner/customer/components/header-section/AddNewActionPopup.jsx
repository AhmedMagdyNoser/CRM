import { useState } from 'react';
import { breakboints } from '../../../../../utils/utils';
import Modal from '../../../../../components/ui/Modal';
import CallForm from './actions-form/CallForm';
import MessageForm from './actions-form/MessageForm';
import MeetingForm from './actions-form/MeatingForm';

const types = ['Call', 'Message', 'Meeting', 'Deal'];

export default function AddNewActionPopup({ setAddNewActionPopupOpen }) {
  const [selectedType, setSelectedType] = useState(types[0]);

  return (
    <Modal title="Add New Action" setOpen={setAddNewActionPopupOpen} className="auto-height">
      <div className="flex justify-around border-b">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`flex-center flex-1 px-4 py-2 text-sm font-semibold sm:text-base ${selectedType === type ? 'btn-primary' : 'btn-secondary'}`}
          >
            {type}
          </button>
        ))}
      </div>
      <div>
        {selectedType === 'Call' ? (
          <CallForm />
        ) : selectedType === 'Message' ? (
          <MessageForm />
        ) : selectedType === 'Meeting' ? (
          <MeetingForm />
        ) : selectedType === 'Deal' ? (
          // <DealForm />
          <div>Deal Form</div>
        ) : null}
      </div>
      <style>
        {`
          @media (min-width: ${breakboints.sm}) {
            .auto-height {
              height: auto !important;
            }
          }
        `}
      </style>
    </Modal>
  );
}
