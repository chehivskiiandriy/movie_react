import React, { Component } from 'react';
import classNames from 'classnames';

import './DrawerToggle.scss';

class DrawerToggle extends Component {
    state = {
      active: false
    };

    handleClick = () => this.setState((prevState) => {
        return { active: !prevState.active }
    });

    render () {
        const { clicked } = this.props;

        return (
            <div
                className={classNames('DrawerToggle', {active: this.state.active})}
                onClick={this.handleClick}
                onMouseDown={clicked}>
                <div/>
                <div/>
                <div/>
            </div>
        );
    }
}

export default DrawerToggle;