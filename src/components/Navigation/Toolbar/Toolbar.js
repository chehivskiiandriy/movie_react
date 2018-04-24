import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../UI/Logo/Logo';
import Search from '../../UI/Search/Search';
import LocaleMenu from '../LocaleMenu/LocaleMenu';
import AuthMenu from '../AuthMenu/AuthMenu';
import ConfirmedMessage from './ConfirmedMessage/ConfirmedMessage';

import './Toolbar.scss';

const Toolbar = ({ drawerToggleClicked }) => (
    <header className="Toolbar">
        <ConfirmedMessage />
        <div className="ToolbarWrapper container">
            <div className="LeftToolbar">
                <div className="ToolbarLogo">
                    <Logo/>
                </div>
                <DrawerToggle clicked={drawerToggleClicked} />
                <nav className="DesktopOnly">
                    <NavigationItems />
                </nav>
            </div>
            <div className="RightToolbar DesktopOnly">
                <Search />
                <LocaleMenu />
                <AuthMenu />
            </div>
        </div>
    </header>
);

export default Toolbar;