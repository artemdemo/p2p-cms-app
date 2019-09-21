import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const NewClientName = (props) => {
    const { value, onChange, error, disabled } = props;

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
                htmlFor="username"
            >
                Client name
            </label>
            <input
                className={classnames(
                    'appearance-none border rounded w-full py-2 px-3 leading-tight',
                    'focus:outline-none focus:shadow-outline',
                    {
                        'text-gray-700': !disabled,
                        'text-gray-400 cursor-not-allowed': disabled,
                        'border-red-500 bg-red-100': error,
                    },
                )}
                id="username"
                type="text"
                placeholder="Name"
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </React.Fragment>
    );
};

NewClientName.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
};

NewClientName.defaultProps = {
    value: undefined,
    onChange: undefined,
    error: false,
    disabled: false,
};

export default NewClientName;
