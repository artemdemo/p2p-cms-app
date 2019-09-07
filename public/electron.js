const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
    const port = process.env.PORT || '3000';
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        // Removing the warning in console:
        // Electron Deprecation Warning (nodeIntegration default change)
        webPreferences: {
            nodeIntegration: true,
        }
    });
    mainWindow.loadURL(isDev ? `http://localhost:${port}` : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        // Open the DevTools.
        // BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});