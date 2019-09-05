import NanoEvents from 'nanoevents';
import { createAction } from '../services/actionCreator';

const clientsEmitter = new NanoEvents();

export const addNewClient = createAction(clientsEmitter, 'ADD_NEW_CLIENT');
