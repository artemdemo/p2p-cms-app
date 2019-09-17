import React from 'react';
import { withRouter } from 'react-router-dom';
import _get from 'lodash/get';
import { addNewClient } from '../events/clients';
import ClientForm from '../containers/ClientForm/ClientForm';
import ClientsList from '../containers/ClientsList/ClientsList';
import { getCustomers } from '../services/gun';

class ClientsView extends React.PureComponent {
    state = {
        client: null,
    };
    unlistenHistory = null;

    componentDidMount() {
        this.watchCustomer();
        const clientId = _get(this.props, 'match.params.clientId');
        if (clientId) {
            this.loadCustomer(clientId);
        }
    }

    componentWillUnmount() {
        this.unlistenHistory && this.unlistenHistory();
    }

    watchCustomer = async () => {
        this.props.history.listen((location, action) => {
            const clientIdRegex = /\/clients\/(\S+)/;
            const match = clientIdRegex.exec(location.pathname);
            if (match) {
                const clientId = match[1];
                this.loadCustomer(clientId);
            }
        });
    };

    loadCustomer = async (clientId) => {
        const customers = await getCustomers();
        customers.get(clientId).on((client) => {
            this.setState({
                client,
            });
        });
    };

    render() {
        return (
            <div className="container mx-auto">
                <ClientForm
                    onSubmit={(client) => {
                        addNewClient(client);
                    }}
                    client={this.state.client}
                    isUpdating={!!this.state.client}
                />
                <ClientsList />
            </div>
        );
    }
}

export default withRouter(ClientsView);
