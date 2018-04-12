import React, { Component } from 'react';

import Aux from '../../../hoc/Aux_/Aux_';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render () {
        const { show, modalClosed, children} = this.props;

        const modalStyle = {
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
        };

        return (
            <Aux>
                <Backdrop show={show} clicked={modalClosed}/>
                <div
                    className=""
                    style={modalStyle}>
                    {children}
                </div>
            </Aux>
        );
    }
}

export default Modal;