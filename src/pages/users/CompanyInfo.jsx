import useCompany from '../../hooks/useCompany';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Alert from '../../components/ui/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '../../utils/faIcons';

function CompanyInfo() {
  useDocumentTitle('Company Info');
  
  const { company } = useCompany();

  return (
    <section className="flex flex-col gap-8">
      <h1>Company Info</h1>
      {company.loading ? (
        <div className="flex-center h-72 flex-col gap-4 rounded-xl bg-gray-100">
          <FontAwesomeIcon icon={icons.spinner} spin className="text-4xl text-pro-300" />
          <p className="">Loading company info...</p>
        </div>
      ) : company.error ? (
        <Alert.Error message={company.error} />
      ) : (
        <div className="col-span-2 flex flex-col gap-8">
          <div>
            <p>Company name</p>
            <p className="mt-2 rounded-xl bg-gray-100 p-5 text-3xl font-bold text-gray-800">{company.data.name}</p>
          </div>

          <div>
            <p>Description</p>
            <p className="mt-2 rounded-xl bg-gray-100 p-5 text-lg">{company.data.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default CompanyInfo;
