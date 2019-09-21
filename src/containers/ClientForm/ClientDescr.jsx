import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ClientDescr = (props) => {
    const { value, onChange, disabled } = props;

    return (
        <React.Fragment>
            <label
                className={classnames(
                    'block text-sm font-bold mb-2',
                    {
                        'text-gray-700': !disabled,
                        'text-gray-400 cursor-not-allowed': disabled,
                    },
                )}
                htmlFor="description"
            >
                Description
            </label>
            <textarea
                className={classnames(
                    'appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
                    {
                        'text-gray-700': !disabled,
                        'text-gray-400 cursor-not-allowed': disabled,
                    },
                )}
                id="description"
                placeholder="Description"
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
            </textarea>
        </React.Fragment>
    );
};

ClientDescr.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

ClientDescr.defaultProps = {
    value: undefined,
    onChange: undefined,
    disabled: false,
};

export default ClientDescr;
