import { Outlet } from 'react-router-dom';

import './result-auth-layout.scss';

export const ResultAuthLayout: React.FC = () => {
  return (
    <div className="result-auth-wrapper">
      <div className="result-auth-blur">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
