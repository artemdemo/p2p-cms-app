import React from 'react';
import PropTypes from 'prop-types';

const NewClientName = (props) => {
    const { value, onChange } = props;

    return (
        <React.Fragment>
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="username"
            >
                Client name
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
};

NewClientName.defaultProps = {
    value: undefined,
    onChange: undefined,
};

export default NewClientName;