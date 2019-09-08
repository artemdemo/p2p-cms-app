import Gun from 'gun';
import { ipcRenderer } from 'electron';
import _get from 'lodash/get';
import * as log from 'loglevel';
import { getIsMainApp } from '../services/app';
import { loadPeers } from '../model/gunReq';

let localGunServerPort = 0;

ipcRenderer.on('gun-server-port', (event, port) => {
    localGunServerPort = port
});

export const getGunServerPort = () => new Promise((resolve) => {
    // In order to be able to support hot reloading and
    // to make the whole process more stable I'm using 2 step of requests:
    // # message that will request data
    // # and listened to the data itself
    ipcRenderer.send('request-gun-server-port');
    setTimeout(() => {
        resolve(localGunServerPort);
    }, 100);
});

let mainAppGunRef = null;

const findMainAppGun = async () => {
    const isMainApp = await getIsMainApp();
    const mainAppGunRef = await getMainAppGun();
    let url = '';
    log.info('isMainApp:', isMainApp);

    if (isMainApp) {
        const port = await getGunServerPort();
        url = `http://localhost:${port}/gun`;
        log.info('Created Gun with peer:', url);
    } else {
        const peers = await loadPeers();
        const host = _get(peers, 'addresses[0]', 'localhost');
        url = `http://${host}:${peers.port}/gun`;
        log.info('Updated peer:', url);
    }
    mainAppGunRef.opt({peers: [url]});
};

/**
 * Will return reference to Gun with peer to main app gun server.
 * Or without peers if not found.
 * (Peers will be loaded separatelly)
 */
const getMainAppGun = async () => {
    if (!mainAppGunRef) {
        // Default port is a dirty hack.
        // For some reason if I'm adding peer via `.opt()` application will only update it, but not read from the peer.
        // App only reads from the url passed on creation.
        // (Don't know the reason)
        mainAppGunRef = Gun(`http://localhost:52089/gun`);

        // I'm not awaiting here, since I want to return refence to Gun asap
        // (even without peers)
        // Peers will be loaded and updated separatelly
        findMainAppGun();
    }
    return mainAppGunRef;
};

export const isEmpty = (item) => {
    if (item) {
        const keys = Object.keys(item);
        return keys.length === 1 && keys.includes('id');
    }
    return true;
};

export const getCustomers = async () => {
    const mainAppGunRef = await getMainAppGun();
    return mainAppGunRef.get('customers');
};
