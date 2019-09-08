const express = require('express');
const Gun = require('gun');
const bonjour = require('bonjour')();
const cors = require('cors');

const GUN_WEB_SERVER = `GUN_WEB_SERVER`;

// `MAIN_APP` at this point defined by the user
// `MAIN_APP=true npm run electron-dev`
const isMainApp = process.env.MAIN_APP === 'true';
const app = express();
 
app.use(cors());

if (isMainApp) {
    app.use(Gun.serve);
}

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello World',
        isMainApp,
        port: process.env.GUN_SERVER_PORT,
    });
});

app.get('/peers', (req, res) => {
    if (isMainApp) {
        res.status(204).send('');
    } else {
        // browse for all http services
        bonjour.find({ type: 'http' }, (service) => {
            if (service.name === GUN_WEB_SERVER) {
                res.json(service);
            }
        })
    }
});

// Port will be provided by creator of this server - electron main process (electron.js)
const server = app.listen(process.env.GUN_SERVER_PORT);

if (isMainApp) {
    console.log('IS MAIN APP, on port', process.env.GUN_SERVER_PORT);
    bonjour.publish({
        name: GUN_WEB_SERVER,
        type: 'http',
        port: process.env.GUN_SERVER_PORT,
    });

    Gun({
        file: 'db/data',
        web: server,
    });
}