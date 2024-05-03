import { BreadcrumbComponent, SettingsButtonComponent } from '../..';

import { headerTitle } from '../../../constants';

import './header-component.scss';

export const HeaderComponent: React.FC = () => {
  return (
    <header className="header">
      <BreadcrumbComponent />
      <div className="horizontal-container">
        <div className="title-wrapper">
          <h1 className="title">{headerTitle}</h1>
        </div>
        <div className="header__extra">
          <SettingsButtonComponent />
        </div>
      </div>
    </header>
  );
};
