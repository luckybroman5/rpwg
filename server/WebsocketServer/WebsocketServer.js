'use strict'; 

//Deps
const websocket = require("nodejs-websocket")

//Project Deps
const BaseServer = require('../../lib/BaseServer');
const MessageController = require('../../shared/MessageController');

//Main


class WebsocketServer extends BaseServer {
    constructor(config){
        super(config);

        // Handles all messages Back And fourth to Client
        this.messageController = new MessageController({

        });

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

    parseJSON(str) {
        let result = false;
        if (str) {
            try {
                result = JSON.parse(str);
            } catch(e) {
                console.log('Problem Parsing JSON');
            }
        }

        return result;
    }
    
    setup(conn) {
        console.log('New Connection Over websocket!');

        this.conn = conn;

        conn.on('text', (str) => {
            const message = this.parseJSON(str);
            if (message) this.messageController.receiveMessage(message);
            else this.conn.sendText(JSON.stringify({
                message: 'Unable To parse Request',
                code: 400,
            }));
        });

        conn.on('close', (code, reason) => {
            this.close(code, reason);
        });
    }
}

module.exports = WebsocketServer;
