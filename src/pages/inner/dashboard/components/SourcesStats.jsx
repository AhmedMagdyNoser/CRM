import React, { useEffect, useState } from 'react';

const data = [
  {
    name: 'Instagram',
    count: 32,
  },
  {
    name: 'Facebook',
    count: 13,
  },
  {
    name: 'Linkedin',
    count: 14,
  },
  {
    name: 'Linkedinn',
    count: 4,
  },
  {
    name: 'Abo Mota',
    count: 1,
  },
];

export default function SourcesStats() {
  const maxValue = Math.max(...data.map((item) => item.count));
  const scale = 100 / maxValue;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="rounded-xl bg-gray-100 p-4 shadow sm:p-5">
      <h2 className="mb-5">Sources Statistics</h2>
      {data.map((item, index) => (
        <div key={index} className="mb-2 grid grid-cols-12 gap-2">
          <div className="col-span-3 text-nowrap rounded-md bg-gray-200 px-2 py-1 text-center text-xs text-gray-800 sm:text-sm lg:col-span-1">
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
