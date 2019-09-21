import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { sm, xs, type, warning, onClick, disabled } = props;
    return (
        <button
            type={type}
            onClick={onClick}
            className={classnames(
                'text-white font-bold rounded',
                'focus:outline-none focus:shadow-outline',
                {
                    'py-2 px-4': !sm && !xs,
                    'py-1 px-2': sm || xs,
                    'text-sm': sm,
                    'text-xs': xs,
                    'bg-blue-500 hover:bg-blue-700': !warning && !disabled,
                    'bg-orange-500 hover:bg-orange-600': warning && !disabled,
                    'bg-gray-400 cursor-not-allowed': disabled,
                },
            )}
            disabled={disabled}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    sm: PropTypes.bool,
    xs: PropTypes.bool,
    type: PropTypes.oneOf([
        'submit', 'button', 'reset',
    ]),
    warning: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    sm: false,
    xs: false,
    type: 'submit',
    warning: false,
    disabled: false,
    onClick: undefined,
};

export default Button;
