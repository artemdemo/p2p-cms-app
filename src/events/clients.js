import NanoEvents from 'nanoevents';
import { createAction } from '../services/actionCreator';
import { nodeKeys, getMainAppGun } from '../services/gun';

const clientsEmitter = new NanoEvents();

export const addNewClient = createAction(clientsEmitter, 'ADD_NEW_CLIENT');
addNewClient.on(async (client) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.set(client);
});

export const deleteClient = createAction(clientsEmitter, 'DELETE_CLIENT');
deleteClient.on(async (clientId) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.get(clientId).put(null);
});
