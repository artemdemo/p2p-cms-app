const express = require('express');
const Gun = require('gun');
const bonjour = require('bonjour')();

const isMainApp = process.env.MAIN_APP === 'true';

(async () => {
    const app = express();
 
    app.get('/', function (req, res) {
        res.send('Hello World');
    })
    
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
})();