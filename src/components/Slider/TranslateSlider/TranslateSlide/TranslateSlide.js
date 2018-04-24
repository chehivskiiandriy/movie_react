import React, { Component } from 'react';

import './TranslateSlide.scss';

class TranslateSlide extends Component {
    render () {
        const { children} = this.props;

        return (
            <div className="TranslateSlide">
                {children}
            </div>
        );
    }
}

export default TranslateSlide;