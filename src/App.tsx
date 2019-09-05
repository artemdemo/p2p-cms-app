import React from 'react';
import 'tailwindcss/dist/base.min.css';
import 'tailwindcss/dist/components.min.css';
import 'tailwindcss/dist/utilities.min.css';
import NewClientForm from './components/NewClientForm/NewClientForm';
import ClientsList from './components/ClientsList/ClientsList';

const App = () => {
    return (
        <div className="container mx-auto">
            <NewClientForm />
            <ClientsList />
        </div>
    );
};

export default App;
