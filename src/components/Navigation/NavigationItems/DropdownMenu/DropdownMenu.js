import React from 'react';
import PropTypes from 'prop-types';

import './DropdownMenu.scss';

const DropdownMenu = ({ children }) => (
    <ul className="DropdownMenu">
        {children}
    </ul>
);

DropdownMenu.propTypes = {
    children: PropTypes.array.isRequired
};

export default DropdownMenu;