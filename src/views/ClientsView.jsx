import React from 'react';
import { Route } from 'react-router-dom';
import ClientsList from '../containers/ClientsList/ClientsList';
import ClientsFormView from './ClientsFormView';

class ClientsView extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <Route path='/clients/:clientId' component={ClientsFormView} />
                <ClientsList />
            </React.Fragment>
        );
    }
}

export default ClientsView;
