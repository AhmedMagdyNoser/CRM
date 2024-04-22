import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCompany from '../../../../../hooks/useCompany';
import Alert from '../../../../../components/ui/Alert';
import icons from '../../../../../utils/faIcons';
import EditMode from './EditMode';

export default function CompanyInfoSection({ editMode }) {
  const { company } = useCompany();

  return company.loading ? (
    <section className="flex-center h-56 flex-col gap-4 rounded-xl bg-gray-100">
      <FontAwesomeIcon icon={icons.spinner} spin className="text-4xl text-pro-300" />
      <p>Loading company info...</p>
    </section>
  ) : company.error ? (
    <Alert.Error message={company.error} />
  ) : editMode ? (
    <EditMode />
  ) : (
    <section className="flex flex-col gap-3">
      <p className="rounded-xl bg-gray-100 p-6 text-3xl font-bold text-gray-800">{company.data.name}</p>
      <p className="rounded-xl bg-gray-100 p-6">{company.data.description}</p>
    </section>
  );
}
