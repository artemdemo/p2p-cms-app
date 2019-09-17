import React from 'react';
import { withRouter } from 'react-router-dom';
import _get from 'lodash/get';
import ClientForm from '../containers/ClientForm/ClientForm';
import { addNewClient } from '../events/clients';
import { nodeKeys, getClientIdFromPathname, getMainAppGun } from '../services/gun';

class ClientsFormView extends React.PureComponent {
    state = {
        client: null,
    };
    unlistenHistory = null;
    customers = null;

    componentDidMount() {
        this.watchCustomer();
        const clientId = _get(this.props, 'match.params.clientId');
        if (clientId) {
            this.loadCustomer(clientId);
        }
    }

    componentWillUnmount() {
        this.unlistenHistory && this.unlistenHistory();
        this.customers.off();
    }

    watchCustomer = async () => {
        this.props.history.listen((location, action) => {
            const clientId = getClientIdFromPathname(location.pathname);
            if (clientId) {
                this.loadCustomer(clientId);
            }
        });
    };

    loadCustomer = async (clientId) => {
        if (!this.customers) {
            const gunRef = await getMainAppGun();
            this.customers = gunRef.get(nodeKeys.CUSTOMERS);
        }
        this.customers.get(clientId).on((client) => {
            this.setState({
                client,
            });
        });
    };

    render() {
        return (
            <ClientForm
                onSubmit={(client) => {
                    addNewClient(client);
                }}
                onCancel={() => {
                    this.props.history.push('/');
                }}
                client={this.state.client}
            />
        );
    }
}

export default withRouter(ClientsFormView);
