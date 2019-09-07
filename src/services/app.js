import { ipcRenderer } from 'electron';

export const getIsMainApp = new Promise((resolve) => {
    ipcRenderer.send('request-is-main-app');
    ipcRenderer.on('is-main-app', (event, _isMainApp) => {
        resolve(_isMainApp);
    });
});