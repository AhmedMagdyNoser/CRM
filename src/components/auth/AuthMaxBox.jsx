import React from 'react';
import ScreenCenterContainer from '../global/ScreenCenterContainer';
import { Link } from 'react-router-dom';

function AuthMaxBox({ className = '', image, title, leave, children }) {
  return (
    <ScreenCenterContainer>
      <div className={'auth-box ' + className}>
        <div className="xl:flex-center hidden w-[500px] p-12">
          <img src={image} alt={title} className="w-[85%]" />
        </div>
        <div className="m-12 hidden w-[1px] rounded bg-progray-100 xl:flex"></div>
        <div className="flex flex-1 flex-col gap-3">
          <h1 className="mb-2">{title}</h1>
          {children}
          {leave && (
            <div className="flex flex-wrap justify-center gap-1">
              {leave.hint && <span className="text-progray-300">{leave.hint}</span>}
              <Link className="font-bold text-pro-200 transition-colors hover:text-pro-300" to={leave.link}>
                {leave.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </ScreenCenterContainer>
  );
}

export default AuthMaxBox;
