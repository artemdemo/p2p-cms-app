import Gun from 'gun';
import { ipcRenderer } from 'electron';

const getGunServerPort = new Promise((resolve) => {
    // In order to be able to support hot reloading and
    // to make the whole process more stable I'm using 2 step of requests:
    // # message that will request data
    // # and listened to the data itself
    ipcRenderer.send('request-gun-server-port');
    ipcRenderer.on('gun-server-port', (event, port) => {
        resolve(port);
    });
});

let gun = null;

const getGun = async () => {
    if (!gun) {
        const port = await getGunServerPort;
        gun = Gun(`http://localhost:${port}/gun`);
    }
    return gun;
};

export const isEmpty = (item) => {
    if (item) {
        const keys = Object.keys(item);
        return keys.length === 1 && keys.includes('id');
    }
    return true;
};

export const getCustomers = async () => {
    const gun = await getGun();
    return gun.get('customers');
};
