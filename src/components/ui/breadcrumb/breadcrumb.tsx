import { ReactNode, useEffect, useState } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { history } from '../../../redux';

import { SettingsButtonComponent } from '../..';

import {
  ROUTE_PATHS,
  breadcrumbItems,
  BreadcrumbTitleText,
  settingsTestId,
} from '../../../constants';

import styles from './breadcrumb.module.scss';

type RouteItem = {
  path: string;
  title: string;
};

export const BreadcrumbComponent: React.FC = () => {
  const location = useLocation();
  const [routerItems, setRouteItems] = useState<RouteItem[]>();
  const [isBreadcrumb, setIsBreadcrumb] = useState(true);
  const [isBack, setIsBack] = useState(false);

  useEffect(() => {
    if (location.pathname === ROUTE_PATHS.profile) {
      setIsBreadcrumb(false);
    }
    if (location.pathname === ROUTE_PATHS.settings) {
      setIsBack(true);
    }
  }, [location]);

  useEffect(() => {
    const newRoutes: RouteItem[] = breadcrumbItems.flatMap((elem) => {
      const child = elem.children?.find((child) => child.path === location.pathname);
      const parent = {
        path: elem.path,
        title: elem.title,
      };

      if (child) {
        if (
          child.title === BreadcrumbTitleText.Profile ||
          child.title === BreadcrumbTitleText.Settings
        ) {
          return child;
        } else {
          return [parent, child];
        }
      } else {
        return parent;
      }
    });
    setRouteItems(newRoutes);
  }, [location]);

  const itemRender = (
    route: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>,
    _params: Record<string, never>,
    routes: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[],
    paths: string[]
  ): ReactNode => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.title}</span>
    ) : (
      <NavLink to={`/${paths.join('/')}`}>{route.title}</NavLink>
    );
  };

  const getPadding = (): { padding: string } => ({
    padding: `${location.pathname === ROUTE_PATHS.main ? '0 24px 16px 0' : '16px 24px'}`,
  });

  const handleBack = () => {
    if (location.pathname === ROUTE_PATHS.settings) {
      history.back();
    }
  };

  const getClassName = (isBreadcrumb: boolean, isBack: boolean) => {
    if (isBreadcrumb) {
      if (isBack) {
        return styles.breadcrumbBack;
      }
      return styles.breadcrumb;
    } else {
      return styles.breadcrumbContainer;
    }
  };

  return (
    <div className={getClassName(isBreadcrumb, isBack)} style={getPadding()} onClick={handleBack}>
      {isBack && <ArrowLeftOutlined />}
      <Breadcrumb
        itemRender={itemRender}
        items={routerItems}
        data-test-id={isBack && settingsTestId.buttonBack}
      />
      {!isBreadcrumb && (
        <div className={styles.settingsWrapper}>
          <SettingsButtonComponent />
        </div>
      )}
    </div>
  );
};
