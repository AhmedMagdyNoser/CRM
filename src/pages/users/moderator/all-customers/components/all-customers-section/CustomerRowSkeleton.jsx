import { Fragment } from 'react';

function CustomerRowSkeleton() {
  const row = (
    <tr className="animate-pulse">
      <td className="px-6 py-4 text-progray-200">
        <div className="h-4 bg-progray-50 "></div>
      </td>
      <td className="px-6 py-4 text-progray-200">
        <div className="h-4 bg-progray-50 "></div>
      </td>
      <td className="px-6 py-4 text-progray-200">
        <div className="h-4 bg-progray-50 "></div>
      </td>
      <td className="px-6 py-4 text-progray-200">
        <div className="h-4 bg-progray-50 "></div>
      </td>
    </tr>
  );

  return (
    <tbody>
      {Array.from({ length: 5 }).map((_, index) => (
        <Fragment key={index}>{row}</Fragment>
      ))}
    </tbody>
  );
}

export default CustomerRowSkeleton;
