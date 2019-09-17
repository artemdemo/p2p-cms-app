const express = require('express');
const bonjour = require('bonjour')();
const cors = require('cors');
const { GUN_WEB_SERVER } = require('./constants');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello World',
        isMainApp: false,
        port: process.env.GUN_SERVER_PORT,
    });
});

app.get('/peers', (req, res) => {
    // browse for all http services
    bonjour.find({ type: 'http' }, (service) => {
        if (service.name === GUN_WEB_SERVER) {
            res.json(service);
        }
    })
});

// Port will be provided by creator of this server - electron main process (electron.js)
app.listen(process.env.GUN_SERVER_PORT);

module.exports = {
    app,
};
