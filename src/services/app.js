import { ipcRenderer } from 'electron';

let isMainApp = false;

ipcRenderer.on('is-main-app', (event, _isMainApp) => {
    isMainApp = _isMainApp;
});

export const getIsMainApp = () => new Promise((resolve) => {
    ipcRenderer.send('request-is-main-app');
    setTimeout(() => {
        resolve(isMainApp);
    }, 100);
});