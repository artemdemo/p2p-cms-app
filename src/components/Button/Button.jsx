import React from 'react';
import classnames from 'classnames';

const Button = props => (
    <button
        className={classnames(
            'bg-blue-500 text-white font-bold py-2 px-4 rounded',
            'focus:outline-none focus:shadow-outline',
            'hover:bg-blue-700',
        )}
    >
        {props.children}
    </button>
);

export default Button;