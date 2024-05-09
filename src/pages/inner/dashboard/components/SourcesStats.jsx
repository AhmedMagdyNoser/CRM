import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const colors = ['#E94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590'];

export default function SourcesStats({ data }) {
  data = data.filter((item) => item.count);

  const dataset = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Customers',
        data: data.map((item) => item.count),
        backgroundColor: colors,
        hoverOffset: 5,
        radius: '90%',
      },
    ],
  };

  return (
    <div className="rounded-3xl bg-gray-100 p-6">
      <h2 className="mb-4">Customer Source Breakdown</h2>
      <Doughnut
        data={dataset}
        options={{
          plugins: {
            legend: {
              align: 'start',
              labels: {
                boxWidth: 20,
              },
            },
          },
        }}
      />
    </div>
  );
}
