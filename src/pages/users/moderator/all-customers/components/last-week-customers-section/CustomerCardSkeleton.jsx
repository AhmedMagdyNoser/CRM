import { Fragment } from 'react';

function CustomersSkeleton({ length = 3 }) {
  const customerCardSkeleton = (
    <div className="flex h-[135px] min-w-[300px] animate-pulse gap-3 bg-white p-5 shadow">
      <div className="flex-center h-10 w-10 rounded-full bg-pro-100"></div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-full bg-pro-100"></div>
        <div className="h-3 w-20 bg-pro-100"></div>
      </div>
    </div>
  );

  return Array.from({ length }).map((_, index) => <Fragment key={index}>{customerCardSkeleton}</Fragment>);
}

export default CustomersSkeleton;