import React from 'react';

const Backdrop = ({ show, clicked }) => (
    show ? <div className="" onClick={clicked} /> : null
);

export default Backdrop;