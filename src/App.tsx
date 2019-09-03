import React from 'react';
import 'tailwindcss/dist/base.min.css';
import 'tailwindcss/dist/components.min.css';
import 'tailwindcss/dist/utilities.min.css';
import NewClientForm from './components/NewClientForm/NewClientForm';

const App = () => {
    return (
        <div className="container mx-auto">
            <NewClientForm />
        </div>
    );
};

export default App;
