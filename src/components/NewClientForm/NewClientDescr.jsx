import React from 'react';
import PropTypes from 'prop-types';

const NewClientDescr = (props) => {
    const { value, onChange } = props;

    return (
        <React.Fragment>
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="description"
            >
                Description
            </label>
            <textarea
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                placeholder="Description"
                value={value}
                onChange={onChange}
            >
            </textarea>
        </React.Fragment>
    );
};

NewClientDescr.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

NewClientDescr.defaultProps = {
    value: undefined,
    onChange: undefined,
};

export default NewClientDescr;