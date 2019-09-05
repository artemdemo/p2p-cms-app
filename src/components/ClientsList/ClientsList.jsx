import React from 'react';
import nanoid from 'nanoid';
import { addNewClient } from '../../events/clients';
import Table from '../Table/Table';
import TableRow from '../Table/TableRow';
import TableCell from '../Table/TableCell';

class ClientsList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            clients: [
                {name: 'Ilon Noobe', descr: 'Some description', id: nanoid()},
            ],
        };

        this.addNewClientUnbind = null;
    }

    componentDidMount() {
        this.addNewClientUnbind = addNewClient.on((client) => {
            this.setState(prevState => ({
                clients: [
                    ...prevState.clients,
                    client,
                ],
            }))
        });
    }

    componentWillUnmount() {
        this.addNewClientUnbind();
    }

    render() {
        return (
            <Table>
                <TableRow header>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
                {this.state.clients.map(client => (
                    <TableRow key={client.id}>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.descr}</TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
};

export default ClientsList;
