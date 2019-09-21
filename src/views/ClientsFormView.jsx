import React from 'react';
import { withRouter } from 'react-router-dom';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import ClientForm from '../containers/ClientForm/ClientForm';
import { addNewCustomer, updateCustomer } from '../events/customers';
import { nodeKeys, getClientIdFromPathname, getMainAppGun } from '../services/gun';

class ClientsFormView extends React.PureComponent {
    state = {
        client: null,
        loading: false,
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
        // If form is loaded first, then it will affect all gun requests after that.
        // It will case the list to display only one customer (instead of full list)
        // Therefore I'm postponing it.
        requestAnimationFrame(() => {
            this.customers.get(clientId).on((client) => {
                this.setState({
                    client: {
                        ...client,
                        id: clientId,
                    },
                });
            });
        });
    };

    afterUpdateGunCb = () => {
        this.setState({
            loading: false,
        }, () => {
            this.props.history.push('/');
        });
    };

    render() {
        return (
            <ClientForm
                onSubmit={(client) => {
                    const clientWithoutId = _omit(client, 'id');
                    if (client.id) {
                        updateCustomer(client.id, clientWithoutId, this.afterUpdateGunCb);
                    } else {
                        addNewCustomer(clientWithoutId, this.afterUpdateGunCb);
                    }
                    this.setState({ loading: true });
                }}
                onCancel={() => {
                    this.props.history.push('/');
                }}
                disabled={this.state.loading}
                client={this.state.client}
            />
        );
    }
}

export default withRouter(ClientsFormView);
