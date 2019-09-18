import NanoEvents from 'nanoevents';
import { createAction } from '../services/actionCreator';
import { nodeKeys, getMainAppGun } from '../services/gun';

const customersEventsEmitter = new NanoEvents();

export const addNewCustomer = createAction(customersEventsEmitter, 'ADD_NEW_CUSTOMER');
addNewCustomer.on(async (client) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.set(client);
});

export const deleteCustomer = createAction(customersEventsEmitter, 'DELETE_CUSTOMER');
deleteCustomer.on(async (clientId) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.get(clientId).put(null);
});
