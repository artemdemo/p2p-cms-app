import React from 'react';
import _without from 'lodash/without';
import { getCustomers } from '../../services/gun';
import Table from '../../components/Table/Table';
import TableRow from '../../components/Table/TableRow';
import TableCell from '../../components/Table/TableCell';
import ClientListItem from './ClientListItem';

class ClientsList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            clientIds: [],
        };
    }

    componentDidMount() {
        this.watchCustomers();
    }

    watchCustomers = async () => {
        const customers = await getCustomers();
        customers.on((clientsRaw) => {
            const clientIds = _without(Object.keys(clientsRaw), '_');
            this.setState({
                clientIds,
            });
        });
    };

    render() {
        return (
            <Table>
                <TableRow header>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>&nbsp;</TableCell>
                </TableRow>
                {this.state.clientIds.map(clientId => (
                    <ClientListItem
                        clientId={clientId}
                        key={clientId}
                    />
                ))}
            </Table>
        );
    }
};

export default ClientsList;
