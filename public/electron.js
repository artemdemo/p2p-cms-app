const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { fork } = require('child_process');

// I need only one main server in the network.
// Therefore only main application should start it.
if (process.env.MAIN_APP === 'true') {
    // The `__dirname` variable is required if you want to deploy on a binary build otherwise the script won’t be reached properly.
    // https://fabiofranchino.com/blog/use-electron-as-local-webserver/
    fork(`${__dirname}/../server/server.js`);
}

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

// Electron is spamming console with security warnings.
// I don't care for now about them
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
console.log('[electron.js] Security warnings has been disabled!');
console.log('              ^^^^^^^^ ^^^^^^^^');
console.log(' ');
console.log(__dirname);

function createWindow() {
    const port = process.env.PORT || '3000';
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        // Removing the warning in console:
        // Electron Deprecation Warning (nodeIntegration default change)
        webPreferences: {
            nodeIntegration: true,
        },
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