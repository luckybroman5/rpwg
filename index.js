'use strict';

// Deps
const websocket = require("nodejs-websocket")
const express = require('express');
const fs = require('fs');

// Main

// Web server that delivers the page
// ----------------------------------------------------------------------

const webServer = express();
const serverPort = 10000;
const socketPort = 10010;

// Just gets the web page in app memory
const page = fs.readFileSync('client/public/index.html').toString();
const jsDoc = fs.readFileSync('client/public/websocket.js').toString();

webServer.get('/', (req, res, next) => {
    res.send(page);
});

webServer.get('/websocket.js', (req, res, next) => {
    res.send(jsDoc);
});

webServer.listen(serverPort, () => {
    console.log('Web Server Up and running on Port: ' + serverPort);
});


// The Socket Server that powers the info on the page
// ----------------------------------------------------------------------

const socketServer = websocket.createServer((conn) => {
    console.log("New connection");
    conn.on("text", (str) => {
        console.log("Received " + str);
        setTimeout(() => {
            conn.sendText('I TOTALLY HERE YOU BREH..');
        }, 5000);
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });
}).listen(socketPort);