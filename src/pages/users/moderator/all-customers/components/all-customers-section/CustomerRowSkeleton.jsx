import { Fragment } from 'react';

function CustomerRowSkeleton({ length = 1 }) {
  const row = (
    <tr className="animate-pulse">
      <td className="px-6 pt-7">
        <div className="h-4 rounded-xl bg-gray-200"></div>
      </td>
      <td className="px-6 pt-7">
        <div className="h-4 rounded-xl bg-gray-200"></div>
      </td>
      <td className="px-6 pt-7">
        <div className="h-4 rounded-xl bg-gray-200"></div>
      </td>
      <td className="px-6 pt-7">
        <div className="h-4 rounded-xl bg-gray-200"></div>
      </td>
      <td className="px-6 pt-7">
        <div className="h-4 rounded-xl bg-gray-200"></div>
      </td>
    </tr>
  );

  return Array.from({ length }).map((_, index) => <Fragment key={index}>{row}</Fragment>);
}

export default CustomerRowSkeleton;
