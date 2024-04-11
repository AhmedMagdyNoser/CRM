import { useState } from 'react';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import DetailsSection from './components/details-section/Section';
import ActionsSection from './components/actions-section/Section';
import CustomerHeaderSection from './components/header-section/Section';

function Customer() {
  useDocumentTitle('Customer Details');

  const [editingMode, setEditingMode] = useState(false);

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  return (
    <div className="flex h-full flex-col gap-4">
      <CustomerHeaderSection editingMode={editingMode} setEditingMode={setEditingMode} deletePopupOpen={deletePopupOpen} setDeletePopupOpen={setDeletePopupOpen} />
      <div className="flex flex-1 flex-wrap gap-5">
        <DetailsSection editingMode={editingMode} setEditingMode={setEditingMode} />
        <ActionsSection />
      </div>
    </div>
  );
}

export default Customer;
