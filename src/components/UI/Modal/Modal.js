import React, { Component } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import './Modal.scss';

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render () {
        const { modalClosed, children } = this.props;

        return (
            <div className="ModalContainer">
                <Backdrop show clicked={modalClosed}/>
                <div className="Modal">{children}</div>
            </div>
        );
    }
}
export default Modal;