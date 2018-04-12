import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../Aux_/Aux_';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    static propTypes = {

    };

    state = {

    };

    render () {
        return (
            <Aux>
                <Toolbar/>
                <SideDrawer/>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;