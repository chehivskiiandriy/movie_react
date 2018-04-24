import React from 'react';

import './Button.scss';

const Button = ({ disabled, clicked, children, buttonStyle }) => (
    <button
        style={buttonStyle}
        disabled={disabled}
        className='Button'
        onClick={clicked}>
        {children}</button>
);

export default Button;