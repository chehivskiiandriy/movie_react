import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../UI/Logo/Logo';

const Toolbar = ({ drawerToggleClicked }) => (
    <header>
        <DrawerToggle clicked={drawerToggleClicked} />
        <div>
            <Logo/>
        </div>
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;