import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './NavigationItem.scss';

const NavigationItem = ({ children, link, name, exact, color }) => {
    console.log('-----', children);
    let classes = '';
    if(!children) classes = 'WithoutChildren';
    if(color) classes += ' ' + color;

    return (
        <li className={`NavigationItem ${classes}`}>
            <NavLink
                to={link}
                exact={exact}
                activeClassName="active">
                <FormattedMessage id={`nav.${name}`} defaultMessage={name}/>
            </NavLink>
            {children}
        </li>
    )
};

NavigationItem.propTypes = {
    children: PropTypes.shape(),
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

export default NavigationItem;