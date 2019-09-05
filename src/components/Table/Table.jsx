import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Table = props => (
    <div
        className={classnames(
            'table border-collapse',
            {
                'w-full': props.widthFull,
            },
            props.className,
        )}
    >
        {props.children}
    </div>
);

Table.propTypes = {
    className: PropTypes.string,
    widthFull: PropTypes.bool,
};

Table.defaultProps = {
    className: '',
    widthFull: true,
};

export default Table;
