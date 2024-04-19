import useDocumentTitle from '../../../hooks/useDocumentTitle';
import CompanyInfoHeaderSection from './components/header-section/Section';
import CompanyInfoSection from './components/company-info-section/Section';

export default function CompanyInfo() {
  useDocumentTitle('Company Info');

  return (
    <div className="flex flex-col gap-8">
      <CompanyInfoHeaderSection />
      <CompanyInfoSection />
    </div>
  );
}
