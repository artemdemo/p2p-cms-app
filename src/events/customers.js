import NanoEvents from 'nanoevents';
import { createAction } from '../services/actionCreator';
import { nodeKeys, getMainAppGun } from '../services/gun';

const customersEventsEmitter = new NanoEvents();

export const addNewCustomer = createAction(customersEventsEmitter, 'ADD_NEW_CUSTOMER');
addNewCustomer.on(async (customer) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.set(customer);
});

export const updateCustomer = createAction(customersEventsEmitter, 'UPDATE_CUSTOMER');
updateCustomer.on(async (customerId, customer) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.get(customerId).put(customer);
});

export const deleteCustomer = createAction(customersEventsEmitter, 'DELETE_CUSTOMER');
deleteCustomer.on(async (customerId) => {
    const gunRef = await getMainAppGun();
    const customers = gunRef.get(nodeKeys.CUSTOMERS);
    customers.get(customerId).put(null);
});
