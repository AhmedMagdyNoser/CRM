import { breakboints,  } from '../../../../../utils/utils';
import Modal from '../../../../../components/ui/Modal';
import CallForm from './actions-form/CallForm';

export default function AddNewActionPopup({ setAddNewActionPopupOpen }) {
  return (
    <Modal title="Add New Action" setOpen={setAddNewActionPopupOpen} className="auto-height">
      <div>
        <CallForm />
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
