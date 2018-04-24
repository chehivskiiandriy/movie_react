import React from 'react';
import classNames from 'classnames';

import './Dot.scss';

const Dot = ({ active, id, clicked }) => (
    <div className={classNames('Dot', { active })} onClick={() => clicked(id)} />
);

export default Dot;