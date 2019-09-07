import NanoEvents from 'nanoevents';
import { createAction } from '../services/actionCreator';
import { getCustomers } from '../services/gun';

const clientsEmitter = new NanoEvents();

export const addNewClient = createAction(clientsEmitter, 'ADD_NEW_CLIENT');
addNewClient.on(async (client) => {
    const customers = await getCustomers();
    customers.set(client);
});

export const deleteClient = createAction(clientsEmitter, 'DELETE_CLIENT');
deleteClient.on(async (clientId) => {
    const customers = await getCustomers();
    customers.get(clientId).put(null);
});