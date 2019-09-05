import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const NewClientName = (props) => {
    const { value, onChange, error } = props;

    return (
        <React.Fragment>
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
            >
                Client name
            </label>
            <input
                className={classnames(
                    'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight',
                    'focus:outline-none focus:shadow-outline',
                    {
                        'border-red-500 bg-red-100': error,
                    },
                )}
                id="username"
                type="text"
                placeholder="Name"
                value={value}
                onChange={onChange}
            />
        </React.Fragment>
    );
};

NewClientName.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
};

NewClientName.defaultProps = {
    value: undefined,
    onChange: undefined,
    error: false,
};

export default NewClientName;