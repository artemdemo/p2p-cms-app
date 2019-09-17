import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import ClientsList from '../containers/ClientsList/ClientsList';
import ClientsFormView from './ClientsFormView';
import { getClientIdFromPathname } from '../services/gun';

class ClientsView extends React.PureComponent {
    render() {
        const { location } = this.props;
        return (
            <React.Fragment>
                <Route path='/clients/:clientId' component={ClientsFormView} />
                <ClientsList
                    activeClientId={getClientIdFromPathname(location.pathname)}
                />
            </React.Fragment>
        );
    }
}

export default withRouter(ClientsView);
