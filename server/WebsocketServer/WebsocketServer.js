'use strict'; 

//Deps
const websocket = require("nodejs-websocket")

//Project Deps
const BaseServer = require('../../lib/BaseServer');

//Main


class WebsocketServer extends BaseServer {
   constructor(config){
      super(config);

    console.log(this.port);

      // Custom setup
      this.server = websocket.createServer((conn) => {
          this.setup(conn);
      })
      .listen(this.port);
      
   }

    handleMessage(str) {
        console.log("Received: " + str);
        setTimeout(() => {
            this.conn.sendText('I TOTALLY HEAR YOU BREH..');
        }, 5000);
    }

    close(code, reason) {
        console.log('Closing Connection!');
        console.log(code);
        console.log(reason);
    }
      
    
    setup(conn) {
        console.log('New Connection Over websocket!');

        this.conn = conn;

        conn.on('text', (str) => {
            this.handleMessage(str);
        });

        conn.on('close', (code, reason) => {
            this.close(code, reason);
        });
    }
}

module.exports = WebsocketServer;
