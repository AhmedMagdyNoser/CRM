import useDocumentTitle from '../../../hooks/useDocumentTitle';
import CompanyInfoHeaderSection from './components/header-section/Section';
import CompanyInfoSection from './components/company-info-section/Section';
import InterestsSection from './components/interests-section/Section';
import { useState } from 'react';

export default function CompanyInfo() {
  useDocumentTitle('Company Info');

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleUpdate(e) {}

  return (
    <div className="flex min-h-full flex-col gap-3">
      <CompanyInfoHeaderSection editMode={editMode} setEditMode={setEditMode} loading={loading} />
      <CompanyInfoSection editMode={editMode} handleUpdate={handleUpdate} loading={loading} error={error} />
      <div className="h-[1px] rounded-xl bg-gray-100"></div> {/* Divider */}
      <InterestsSection />
    </div>
  );
}
