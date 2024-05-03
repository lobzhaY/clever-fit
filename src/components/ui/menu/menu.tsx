import { useEffect, useState } from 'react';

import type { MenuProps } from 'antd';
import { Badge, Button, Menu } from 'antd';
import { CalendarTwoTone, HeartFilled, ProfileOutlined, TrophyFilled } from '@ant-design/icons';

import { useAppDispatch } from '../../../hooks';
import { addNavData, history, removeAuthData, store } from '../../../redux';

import { NavButtonWrapperComponent } from '../../pages';

import {
    MenuItemsTypes,
    workoutsTestId,
    ROUTE_PATHS,
    achievementsTestId,
} from '../../../constants';

import logoPartFirst from '../../../assets/sider/logo/clever.png';
import logoPartSecond from '../../../assets/sider/logo/fit.png';
import exitIconSvg from '../../../assets/sider/icons/exit-vector.svg';

import './menu.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

type IMenu = {
    isCollapsed: boolean;
};

export const MenuComponent: React.FC<IMenu> = ({ isCollapsed }) => {
    const dispatch = useAppDispatch();

    const [countInvites, setCountInvites] = useState<number>();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    useEffect(() => {
        const unsubscribe = store.subscribe(() =>
            setCountInvites(store.getState().invite.countInvites),
        );

        return () => {
            unsubscribe();
        };
    }, []);

    const items: MenuItem[] = [
        getItem(
            MenuItemsTypes.Calendar,
            MenuItemsTypes.Calendar,
            <CalendarTwoTone className='menu-icon' />,
        ),
        getItem(
            MenuItemsTypes.Exercise,
            MenuItemsTypes.Exercise,
            <Badge
                count={countInvites}
                size='small'
                className='menu-icon'
                data-test-id={workoutsTestId.jointTraining.notification}
            >
                <HeartFilled className='menu-icon' />
            </Badge>,
        ),
        getItem(
            MenuItemsTypes.Achievements,
            MenuItemsTypes.Achievements,
            <TrophyFilled className='menu-icon' />,
        ),
        getItem(
            MenuItemsTypes.Profile,
            MenuItemsTypes.Profile,
            <ProfileOutlined className='menu-icon' />,
        ),
    ];

    const logout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        dispatch(removeAuthData());
        history.push(ROUTE_PATHS.routes.auth);
    };

    const handleGoMain = () => {
        setSelectedKeys([]);
        history.push(ROUTE_PATHS.main);
    };

    const handleNavigate: MenuProps['onClick'] = (e) => {
        setSelectedKeys([e.key]);
        switch (e.key) {
            case MenuItemsTypes.Calendar:
                dispatch(addNavData({ typeNav: MenuItemsTypes.Calendar }));
                break;
            case MenuItemsTypes.Profile:
                dispatch(addNavData({ typeNav: MenuItemsTypes.Profile }));
                break;
            case MenuItemsTypes.Exercise:
                dispatch(addNavData({ typeNav: MenuItemsTypes.Exercise }));
                break;
            case MenuItemsTypes.Achievements:
                dispatch(addNavData({ typeNav: MenuItemsTypes.Achievements }));
                break;
            default:
                break;
        }
    };

    return (
        <div className='menu-container'>
            <div className={isCollapsed ? 'collapsed-logo' : 'menu-logo'} onClick={handleGoMain}>
                <img
                    src={logoPartFirst}
                    alt='Clever'
                    className={isCollapsed ? 'collapsed-logo-disabled' : 'collapsed-logo-clever'}
                />
                <img
                    src={logoPartSecond}
                    alt='fit'
                    className={isCollapsed ? 'collapsed-logo-active' : 'collapsed-logo-fit'}
                />
            </div>
            <NavButtonWrapperComponent>
                <Menu
                    className='menu-content'
                    onClick={handleNavigate}
                    selectedKeys={selectedKeys}
                >
                    {items.map(
                        (item: MenuItem) =>
                            item && (
                                <Menu.Item
                                    {...item}
                                    data-test-id={item.key === MenuItemsTypes.Achievements
                                            ? achievementsTestId.sidebarAchievements
                                            : ''
                                    }
                                >
                                    {item.label}
                                </Menu.Item>
                            ),
                    )}
                </Menu>
            </NavButtonWrapperComponent>
            <Button
                type='text'
                className={isCollapsed ? 'collapsed-exit-active' : 'menu-exit'}
                onClick={logout}
            >
                <img src={exitIconSvg} className='menu-exit__icon' alt='Exit' />
                <p>Выход</p>
            </Button>
        </div>
    );
};
