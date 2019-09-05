import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TableRow = props => (
    <div
        className={classnames({
            'table-row': true,
            'font-bold': props.header,
        }, props.className)}
    >
        {props.children}
    </div>
);

TableRow.propTypes = {
    className: PropTypes.string,
    header: PropTypes.bool,
};

TableRow.defaultProps = {
    className: '',
    header: false,
};

export default TableRow;
