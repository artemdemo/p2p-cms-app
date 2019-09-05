import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TableCell = props => (
    <div
        className={classnames(
            'table-cell px-4 py-2 text-sm',
            props.className,
        )}
    >
        {props.children}
    </div>
);

TableCell.propTypes = {
    className: PropTypes.string,
};

TableCell.defaultProps = {
    className: '',
};

export default TableCell;
