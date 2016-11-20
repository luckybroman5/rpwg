'use strict'; 

//Deps
const express = require('express');
const fs = require('fs');

//Project Deps
const BaseServer = require('../../lib/BaseServer');
const Routes = require('./Routes');

//Main

class WebServer extends BaseServer {
   constructor(config){
      super(config);

      // Each server has its own port
      this.port = config.port || 10000;
      
      // Setup the driver
      this.server = express();
      
      // Init the driver
      this.setup();
   };

   setup() {
       const server = this.server;
    
       // Route Assignment
       Routes(this);

       // Lazily caching pages in app memory
       // May not be the best idea when less memory on server
       this.pages = {
           main: fs.readFileSync('./client/public/index.html').toString(),
           'websocket.js': fs.readFileSync('./client/public/websocket.js'),
       };

       server.listen(this.port, () => {
           console.log('WebServer Up and Running on port: ' + this.port);
       });
   }

   MainPage(req, res, next) {
       res.send(this.pages.main);
   }

}

module.exports = WebServer;
