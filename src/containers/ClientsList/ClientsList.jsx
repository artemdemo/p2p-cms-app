import React from 'react';
import nanoid from 'nanoid';
import { customers } from '../../services/gun';
import Table from '../../components/Table/Table';
import TableRow from '../../components/Table/TableRow';
import TableCell from '../../components/Table/TableCell';
import Button from '../../components/Button/Button';

class ClientsList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            clients: [
                {name: 'Ilon Noobe', descr: 'Some description', id: nanoid()},
            ],
        };
    }

    componentDidMount() {
        customers.map().on((client, id) => {
            this.setState(prevState => ({
                clients: [
                    {
                        ...client,
                        id,
                    },
                    ...prevState.clients,
                ],
            }))
        });
    }

    render() {
        return (
            <Table>
                <TableRow header>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell> </TableCell>
                </TableRow>
                {this.state.clients.map(client => (
                    <TableRow key={client.id}>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.descr}</TableCell>
                        <TableCell>
                            <Button xs>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
};

export default ClientsList;
