import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TableCell = props => (
    <div
        className={classnames(
            'table-cell px-4 py-2 text-sm',
            {
                'border-gray-300': true,
                'border-b border-t': !props.header,
                'border-b-2 border-t-2': props.header,
            },
            props.className,
        )}
    >
        {props.children}
    </div>
);

TableCell.propTypes = {
    className: PropTypes.string,
    header: PropTypes.bool,
};

TableCell.defaultProps = {
    className: '',
    header: false,
};

export default TableCell;
