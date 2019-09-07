import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../../components/Table/TableRow';
import TableCell from '../../components/Table/TableCell';
import Button from '../../components/Button/Button';
import { deleteClient } from '../../events/clients';
import { isEmpty, getCustomers } from '../../services/gun';

class ClientListItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            client: null
        };
    }

    componentDidMount() {
        this.watchCustomer();
    }

    componentWillUnmount() {
        this.unwatchCustomer();
    }

    watchCustomer = async () => {
        const { clientId } = this.props;
        const customers = await getCustomers();
        customers.get(clientId).on((client) => {
            this.setState({
                client,
            });
        });
    };

    unwatchCustomer = async () => {
        const { clientId } = this.props;
        const customers = await getCustomers();
        customers.get(clientId).off();
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
                            onClick={() => {
                                deleteClient(clientId);
                            }}
                        >
                            Delete
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

export default ClientListItem;