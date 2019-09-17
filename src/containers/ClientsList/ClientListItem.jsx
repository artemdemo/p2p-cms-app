import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TableRow from '../../components/Table/TableRow';
import TableCell from '../../components/Table/TableCell';
import Button from '../../components/Button/Button';
import { deleteClient } from '../../events/clients';
import { isEmpty, getMainAppGun, nodeKeys } from '../../services/gun';

class ClientListItem extends React.PureComponent {
    state = {
        client: null
    };

    customers = null;

    componentDidMount() {
        this.watchCustomer();
    }

    componentWillUnmount() {
        this.unwatchCustomer();
    }

    watchCustomer = async () => {
        const { clientId } = this.props;
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

    unwatchCustomer = async () => {
        const { clientId } = this.props;
        this.customers.get(clientId).off();
        this.customers.off();
    };

    updateClient = () => {
        const { history, clientId } = this.props;
        history.push(`/clients/${clientId}`);
    };

    render() {
        const { clientId } = this.props;

        if (!isEmpty(this.state.client)) {
            return (
                <TableRow>
                    <TableCell>{this.state.client.name}</TableCell>
                    <TableCell>{this.state.client.descr}</TableCell>
                    <TableCell>
                        <Button
                            xs
                            warning
                            onClick={() => {
                                deleteClient(clientId);
                            }}
                        >
                            Delete
                        </Button>
                        {' '}
                        <Button
                            xs
                            onClick={this.updateClient}
                        >
                            Update
                        </Button>
                    </TableCell>
                </TableRow>
            );
        }
        return null;
    }
}

ClientListItem.propTypes = {
    clientId: PropTypes.string.isRequired,
};

ClientListItem.defaultProps = {};

export default withRouter(ClientListItem);
