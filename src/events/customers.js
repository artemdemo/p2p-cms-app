import NanoEvents from 'nanoevents';
import { createAction } from '../services/actionCreator';
import { nodeKeys, getMainAppGun } from '../services/gun';

const customersEventsEmitter = new NanoEvents();

export const addNewCustomer = createAction(customersEventsEmitter, 'ADD_NEW_CUSTOMER');
addNewCustomer.on(async (customer, cb) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.set(customer, cb);
});

export const updateCustomer = createAction(customersEventsEmitter, 'UPDATE_CUSTOMER');
updateCustomer.on(async (customerId, customer, cb) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.get(customerId).put(customer, cb);
});

export const deleteCustomer = createAction(customersEventsEmitter, 'DELETE_CUSTOMER');
deleteCustomer.on(async (customerId, cb) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.get(customerId).put(null, cb);
});
