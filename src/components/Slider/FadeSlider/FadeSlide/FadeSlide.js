import React, { Component } from 'react';
import classNames from 'classnames';

import './FadeSlide.scss';

class FadeSlide extends Component {
    render () {
        const { show, image, title } = this.props;

        return (
            <div className={classNames('FadeSlide', { active: show })}>
                <img src={image} alt=""/>
                <span>{title}</span>
            </div>
        );
    }
}

export default FadeSlide;