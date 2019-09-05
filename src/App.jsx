import React from 'react';
import 'tailwindcss/dist/base.min.css';
import 'tailwindcss/dist/components.min.css';
import 'tailwindcss/dist/utilities.min.css';
import { addNewClient } from './events/clients';
import ClientForm from './components/ClientForm/ClientForm';
import ClientsList from './components/ClientsList/ClientsList';

const App = () => {
    return (
        <div className="container mx-auto">
            <ClientForm
                onSubmit={(client) => {
                    addNewClient(client);
                }}
            />
            <ClientsList />
        </div>
    );
};

export default App;
