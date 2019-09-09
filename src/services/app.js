import { ipcRenderer } from 'electron';

let isMainApp = false;

ipcRenderer.on('is-main-app', (event, _isMainApp) => {
    isMainApp = _isMainApp;
});

export const getIsMainApp = () => new Promise((resolve) => {
    ipcRenderer.send('request-is-main-app');
    // Yes, below is dirty hack, I know.
    // But I can't add listener here (it will add subscription on each call)
    // and don't have better idea for now.
    setTimeout(() => {
        resolve(isMainApp);
    }, 100);
});