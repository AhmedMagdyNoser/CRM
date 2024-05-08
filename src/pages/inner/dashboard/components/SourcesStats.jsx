import { useEffect, useState } from 'react';

export default function SourcesStats({data}) {
  const maxValue = Math.max(...data.map((item) => item.count));
  const scale = 100 / maxValue;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="rounded-xl bg-gray-100 p-4 shadow sm:p-5">
      <h2 className="mb-5">Customer Source Breakdown</h2>
      {data.map((item, index) => (
        <div key={index} className="mb-2 grid grid-cols-12 gap-2">
          <div className="col-span-3 text-nowrap rounded-md bg-gray-200 px-2 py-1 text-center text-xs text-gray-500 sm:text-sm lg:col-span-1">
            {item.name}
          </div>
          <div className="col-span-8 flex-1 rounded-md bg-gray-200 lg:col-span-10">
            <div
              className="h-full rounded-md bg-pro-300 transition-all duration-1000"
              style={{ width: loaded ? `${item.count * scale}%` : 0 }}
            ></div>
          </div>
          <div
            title={`${item.count} Customers`}
            className="rounded-md bg-gray-200 px-2 py-1 text-center text-sm text-gray-800"
          >
            {item.count}
          </div>
        </div>
      ))}
    </div>
  );
}
