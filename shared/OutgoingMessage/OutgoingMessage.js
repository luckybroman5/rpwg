'use strict'; 

//Deps


//Project Deps
const BaseMessage = require('../../lib/BaseMessage');

//Main


class OutgoingMessage extends BaseMessage {
    constructor(messageBody) {
        if (!messageBody || !messageBody.id) return null;
        super();
        
        this.id = messageBody.id;

        this.messageType = 'outgoing';

        this.message = messageBody;
    }

    get timeSent() {
       return this.time_created;
   }
}

module.exports = OutgoingMessage;
