import useOnLoadFetch from '../../../../hooks/useOnLoadFetch';

export default function DailyReport() {
  // Fetch the data from the server
  const { data, loading, error } = useOnLoadFetch('/reports/daily-report');

  // Remove the next line and render the table here:
  return <div>{JSON.stringify(data)}</div>;
}
