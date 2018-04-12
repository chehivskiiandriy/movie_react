import React from 'react';

import Aux from '../../../hoc/Aux_/Aux_';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../UI/Logo/Logo';

const SideDrawer = ({ open, closed }) => {
    return (
        <Aux>
            <Backdrop show={open} clicked={closed}/>
            <div onClick={closed}>
                <div>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;