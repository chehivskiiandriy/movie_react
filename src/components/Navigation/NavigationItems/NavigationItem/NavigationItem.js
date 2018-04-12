import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({ children, link, name, exact }) => {
    console.log('-----', children);
    return (
        <li>
            <NavLink
                to={link}
                exact={exact}
                activeClassName="active">{name}</NavLink>
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