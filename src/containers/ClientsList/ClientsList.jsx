import React from 'react';
import PropTypes from 'prop-types';
import _without from 'lodash/without';
import { nodeKeys, getMainAppGun } from '../../services/gun';
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
        this.customers = null;
    }

    componentDidMount() {
        this.watchCustomers();
    }

    componentWillUnmount() {
        this.customers.off();
    }

    watchCustomers = async () => {
        if (!this.customers) {
            const gunRef = await getMainAppGun();
            this.customers = gunRef.get(nodeKeys.CUSTOMERS);
        }
        this.customers.on((clientsRaw) => {
            const clientIds = _without(Object.keys(clientsRaw), '_');
            this.setState({
                clientIds,
            });
        });
    };

    render() {
        const { activeClientId } = this.props;
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
                        isActive={activeClientId === clientId}
                        key={clientId}
                    />
                ))}
            </Table>
        );
    }
}

ClientsList.propTypes = {
    activeClientId: PropTypes.string,
};

ClientsList.defaultProps = {
    activeClientId: null,
};

export default ClientsList;
