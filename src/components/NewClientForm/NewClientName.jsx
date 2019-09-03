import React from 'react';

const NewClientName = () => {
    return (
        <React.Fragment>
            <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
            >
                Client name
            </label>
            <input
                class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Name"
            />
        </React.Fragment>
    );
};

export default NewClientName;