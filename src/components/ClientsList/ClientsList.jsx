import React from 'react';
import Table from '../Table/Table';
import TableRow from '../Table/TableRow';
import TableCell from '../Table/TableCell';

const ClientsList = () => {
    return (
        <Table>
            <TableRow header>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Ilon Noobe</TableCell>
                <TableCell>Some description</TableCell>
            </TableRow>
        </Table>
    );
};

export default ClientsList;
