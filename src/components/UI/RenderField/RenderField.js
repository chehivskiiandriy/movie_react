import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';

import './RenderField.scss';

class RenderField extends Component {
    static propTypes = {
        input: PropTypes.shape().isRequired,
        type: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        meta: PropTypes.shape({
            error: PropTypes.string,
            warning: PropTypes.string,
            touched: PropTypes.bool.isRequired
        }).isRequired
    };

    state = {
        showPassword: false
    };

    changeTypeHandler = () => {
        this.setState(prevState => ({ showPassword: !prevState.showPassword}));
    };

    render () {
        const { input, type, label, meta: { error, warning, touched, invalid }, iconType, intl } = this.props;
        const { showPassword } = this.state;

        const errorText = touched &&
            ((error && <span className="Error">{error}</span>) || (warning && <span>{warning}</span>));
        let inputType = type;

        if(type === 'password' && showPassword) {
            inputType = 'text';
        }

        return (
            <div className="RenderField">
                <input
                    {...input}
                    type={inputType}
                    id={input.name}
                    // placeholder={label}
                    placeholder={intl.formatMessage({ id: `form.field.${input.name}` })}
                    className={classNames('RenderInput', { invalid, touched, isEmpty: input.value === ''})}/>
                <label htmlFor={input.name}><span className={`icon icon-${iconType}`}/></label>
                {type === 'password' &&
                <div className="Eye" onClick={this.changeTypeHandler}>
                    <span className={`icon icon-${showPassword ? 'eye-blocked' : 'eye'}`}/>
                </div>}
                <div className="Bar" />
                {errorText}
            </div>
        );
    }
}

export default injectIntl(RenderField);