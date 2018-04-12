import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ children }) => (
    <ul>
        {children}
    </ul>
);

Dropdown.propTypes = {
    children: PropTypes.array.isRequired
};

export default Dropdown;