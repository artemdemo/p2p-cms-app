import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { sm, xs, warning, onClick } = props;
    return (
        <button
            onClick={onClick}
            className={classnames(
                'text-white font-bold rounded',
                'focus:outline-none focus:shadow-outline',
                'hover:bg-blue-700',
                {
                    'py-2 px-4': !sm && !xs,
                    'py-1 px-2': sm || xs,
                    'text-sm': sm,
                    'text-xs': xs,
                    'bg-blue-500': !warning,
                    'bg-orange-500': warning,
                },
            )}
        >
            {props.children}
        </button>
    );
};

Button.propTypes = {
    sm: PropTypes.bool,
    xs: PropTypes.bool,
    warning: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    sm: false,
    xs: false,
    warning: false,
    onClick: undefined,
};

export default Button;
