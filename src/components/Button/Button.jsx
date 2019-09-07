import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { sm, xs } = props;
    return (
        <button
            className={classnames(
                'bg-blue-500 text-white font-bold rounded',
                'focus:outline-none focus:shadow-outline',
                'hover:bg-blue-700',
                {
                    'py-2 px-4': !sm && !xs,
                    'py-1 px-2': sm || xs,
                    'text-sm': sm,
                    'text-xs': xs,
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
};

Button.defaultProps = {
    sm: false,
    xs: false,
};

export default Button;