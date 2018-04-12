import React from 'react';
import PropTypes from 'prop-types';

const RenderField = ({ input, type, label, meta: { error, warning, touched } }) => {
    const errorText = touched &&
        ((error && <span>{error}</span>) || (warning && <span>{warning}</span>));
    console.log(label);
    return (
        <div>
            <label htmlFor={input.name}>{label}</label>
            <input {...input} type={type} id={input.name} placeholder={label}/>
            {errorText}
        </div>
    );
};

RenderField.propTypes = {
    input: PropTypes.shape().isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.shape({
        error: PropTypes.string,
        warning: PropTypes.string,
        touched: PropTypes.bool.isRequired
    }).isRequired
};

export default RenderField;