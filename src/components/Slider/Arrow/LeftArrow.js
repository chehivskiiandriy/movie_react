import React from 'react';

const LeftArrow = ({ prevSlide }) => (
    <div className="LeftArrow" onClick={prevSlide}>
        <span className="icon icon-back"/>
    </div>
);

export default LeftArrow;