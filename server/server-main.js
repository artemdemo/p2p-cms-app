const express = require('express');
const Gun = require('gun');
const bonjour = require('bonjour')();
const cors = require('cors');
const { GUN_WEB_SERVER } = require('./constants');

const app = express();

app.use(cors());
app.use(Gun.serve);

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello World',
        isMainApp: true,
        port: process.env.GUN_SERVER_PORT,
    });
});

app.get('/peers', (req, res) => {
    res.status(204).send('');
});

// Port will be provided by creator of this server - electron main process (electron.js)
const server = app.listen(process.env.GUN_SERVER_PORT);

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

module.exports = {
    app,
};
