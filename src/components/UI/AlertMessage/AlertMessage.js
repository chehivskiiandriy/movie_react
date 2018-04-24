import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import successImg from '../../../assets/images/success.png';
import failImg from '../../../assets/images/fail.png';

import './AlertMessage.scss';

class AlertMessage extends Component {
    componentDidMount () {
        setTimeout(() => {
            this.close();
        }, 5000)
    }

    close = () => this.props.closeAlert();

    render () {
        const { typeMessage, message } = this.props;

        let img;
        if(typeMessage === 'Success') img = successImg; else img = failImg;

        return (
            <div className={typeMessage}>
                <img src={img} alt=""/>
                <span>
                    <FormattedMessage id={`alertMessage.${message}`}/>
                    {/*{message}*/}
                    </span>
                <div onClick={this.close} className="CloseAlert">
                    <span className="icon icon-close"/>
                </div>
            </div>
        );
    }
}

export default AlertMessage;