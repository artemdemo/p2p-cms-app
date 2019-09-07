import NanoEvents from 'nanoevents';
import { createAction } from '../services/actionCreator';
import { customers } from '../services/gun';

const clientsEmitter = new NanoEvents();

export const addNewClient = createAction(clientsEmitter, 'ADD_NEW_CLIENT');
addNewClient.on((client) => {
    customers.set(client);
});
