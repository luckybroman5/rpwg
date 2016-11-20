'use strict';

const WebServer = require('./server/WebServer');
const WebSocket = require('./server/WebsocketServer');

const config = {

};

const serverConfig = {
    port: 10000,
    errors: {
        notFound: {
            message: 'Resource Not Found!',
        },
        badResource: {
            message: 'Unable to find resource',
        }
    },
};

const websocketConfig = {
    port: 10010,
};

// The web server that delivers a static html that just opens a websocket
new WebServer(serverConfig);

// The controller for direct communication with the static Webpage
new WebSocket(websocketConfig);