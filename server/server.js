const express = require('express');
const Gun = require('gun');
const bonjour = require('bonjour')();

const isMainApp = process.env.MAIN_APP === 'true';

const app = express();
 
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/peers', (req, res) => {
    res.send('bonjour');
});

if (isMainApp) {
    app.use(Gun.serve);
}

const server = app.listen(process.env.GUN_SERVER_PORT);

if (isMainApp) {
    console.log('IS MAIN APP');
    bonjour.publish({
        name: 'Gun Web Server',
        type: 'http',
        port: process.env.GUN_SERVER_PORT,
    });

    Gun({
        file: 'db/data',
        web: server,
    });
} else {
    // browse for all http services
    bonjour.find({ type: 'http' }, function (service) {
        console.log('Found an HTTP server:', service)
    })
}