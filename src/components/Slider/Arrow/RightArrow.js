import React from 'react';

const RightArrow = ({ nextSlide }) => (
    <div className="RightArrow" onClick={nextSlide}>
        <span className="icon icon-next"/>
    </div>
);

export default RightArrow;