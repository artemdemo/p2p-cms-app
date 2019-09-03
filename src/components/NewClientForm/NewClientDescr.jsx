import React from 'react';

const NewClientDescr = () => {
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
            >
            </textarea>
        </React.Fragment>
    );
};

export default NewClientDescr;