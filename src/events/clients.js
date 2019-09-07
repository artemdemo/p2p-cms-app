import NanoEvents from 'nanoevents';
import { createAction } from '../services/actionCreator';
import { getCustomers } from '../services/gun';

const clientsEmitter = new NanoEvents();

export const addNewClient = createAction(clientsEmitter, 'ADD_NEW_CLIENT');
addNewClient.on((client) => {
    getCustomers().then((customers) => {
        customers.set(client);
    });
});

export const deleteClient = createAction(clientsEmitter, 'DELETE_CLIENT');
deleteClient.on((clientId) => {
    getCustomers().then((customers) => {
        customers.get(clientId).put(null);
    });
});