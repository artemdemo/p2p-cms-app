import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TableCell from './TableCell';

const TableRow = props => (
    <div
        className={classnames(
            'table-row',
            {
                'font-bold': props.header,
                'bg-gray-100': props.header,
            },
            props.className,
        )}
    >
        {React.Children.map(props.children, function(child) {
            if (props.header && child.type === TableCell) {
                return React.cloneElement(
                    child,
                    {
                        header: true,
                    },
                );
            };
            return child;
        })}
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
